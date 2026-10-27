import { NextResponse } from "next/server";
import { CAMPUS_NAMES, LEVELS } from "@/components/sites/sultanfatih/data";

/**
 * POST /api/on-kayit — ön kayıt (lead) kabul ucu.
 *
 * Davranış:
 * - Sunucu tarafında doğrular; hatalı başvuruda 400 + alan bazlı mesaj döner.
 * - Başarıda referans numarası üretir: SFK-<yıl>-<8 karakter>.
 * - `LEAD_WEBHOOK_URL` ortam değişkeni tanımlıysa başvuruyu o adrese
 *   (K12Net / CRM köprüsü) JSON olarak iletir. Tanımlı değilse kayıt
 *   "local" modda yalnızca referans döner (önizleme/geliştirme).
 * - Kişisel veriyi loglamaz, diskte saklamaz; yanıt no-store'dur.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NO_STORE = { "Cache-Control": "no-store" };

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function normalizePhone(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("90") && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  return digits;
}

function makeReference(): string {
  const suffix = globalThis.crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `SFK-${new Date().getFullYear()}-${suffix}`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Geçersiz istek gövdesi." },
      { status: 400, headers: NO_STORE }
    );
  }

  // Bal küpü dolu ise bot kabul et; işlemi sessizce başarı gibi bitir,
  // webhook'a hiçbir şey iletme.
  if (str(body.website, 100)) {
    return NextResponse.json(
      { ok: true, reference: makeReference(), mode: "local" },
      { status: 202, headers: NO_STORE }
    );
  }

  const lead = {
    parentName: str(body.parentName, 80),
    phone: str(body.phone, 24),
    email: str(body.email, 120),
    studentName: str(body.studentName, 60),
    level: str(body.level, 40),
    grade: str(body.grade, 24),
    campus: str(body.campus, 60),
    note: str(body.note, 500),
    contactConsent: body.contactConsent === true,
  };
  const kvkkConsent = body.kvkkConsent === true;

  const errors: Record<string, string> = {};
  if (lead.parentName.length < 3) errors.parentName = "Veli adı soyadı gerekli.";
  if (normalizePhone(lead.phone).length !== 10)
    errors.phone = "Geçerli bir telefon numarası gerekli.";
  if (lead.email && !EMAIL_RE.test(lead.email)) errors.email = "E-posta biçimi hatalı.";
  if (!(LEVELS as readonly string[]).includes(lead.level))
    errors.level = "Kademe seçimi gerekli.";
  if (!(CAMPUS_NAMES as readonly string[]).includes(lead.campus))
    errors.campus = "Kampüs seçimi gerekli.";
  if (!kvkkConsent) errors.kvkk = "Aydınlatma Metni onayı gerekli.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Lütfen işaretli alanları kontrol edin.", fields: errors },
      { status: 400, headers: NO_STORE }
    );
  }

  const reference = makeReference();
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { ok: true, reference, mode: "local" },
      { status: 202, headers: NO_STORE }
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { "X-Lead-Secret": process.env.LEAD_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        reference,
        submittedAt: new Date().toISOString(),
        source: "sultanfatih-website/on-kayit",
        lead,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Başvurunuz şu an iletilemedi. Lütfen birazdan tekrar deneyin veya resmî ön kayıt formunu kullanın.",
      },
      { status: 502, headers: NO_STORE }
    );
  }

  return NextResponse.json(
    { ok: true, reference, mode: "webhook" },
    { status: 201, headers: NO_STORE }
  );
}
