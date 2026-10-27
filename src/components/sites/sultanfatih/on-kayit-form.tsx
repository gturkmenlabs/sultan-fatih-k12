"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { CAMPUS_NAMES, LEVELS, OFFICIAL, REGISTRATION_STEPS } from "./data";
import {
  STORAGE_KEYS,
  isValidPhone,
  readJSON,
  readStorage,
  removeStorage,
  writeJSON,
  writeStorage,
  type LeadDraft,
} from "./storage";

const STEP_LABELS = ["Veli Bilgileri", "Öğrenci & Tercih", "Onay & Gönderim"] as const;
const GRADES = ["Ana sınıfı", ...Array.from({ length: 12 }, (_, i) => `${i + 1}. sınıf`)];

const inputClass =
  "w-full rounded-buttons bg-mist px-4 py-3 text-body text-bumble-ink placeholder:text-graphite/70 outline-none transition-shadow focus:ring-2 focus:ring-bumble-ink aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500";
const labelClass = "mb-1.5 block text-caption font-medium text-bumble-ink";
const errorClass = "mt-1.5 text-caption font-medium text-red-700";

interface Fields {
  parentName: string;
  phone: string;
  email: string;
  studentName: string;
  level: string;
  grade: string;
  campus: string;
  note: string;
}

const EMPTY: Fields = {
  parentName: "",
  phone: "",
  email: "",
  studentName: "",
  level: "",
  grade: "",
  campus: "",
  note: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Çok adımlı ön kayıt formu — Kanca Modeli eşlemesi:
 * - Eylem: her adım az alan sorar; ana sayfa mini formundan gelen taslak
 *   2. adımdan başlatır (kazanılmış ilerleme etkisi).
 * - Yatırım: her değişiklik cihazda taslağa yazılır; kullanıcı yarın
 *   döndüğünde duyuru şeridi onu kaldığı adıma çağırır.
 * - Özerklik/etik: iletişim izni varsayılanı kapalı ayrı bir kutudur;
 *   gönderim yalnızca KVKK onayıyla, son adımda olur.
 */
export function PreRegistrationForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "kvkk", string>>>({});
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [reference, setReference] = useState<string | null>(null);
  const [submitMode, setSubmitMode] = useState<string>("");
  const [previousRef, setPreviousRef] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const loadedRef = useRef(false);
  const submittedRef = useRef(false);

  /* Taslağı / kampüs tercihini / URL parametresini yükle */
  useEffect(() => {
    const draft = readJSON<LeadDraft>(STORAGE_KEYS.draft);
    const campusPref = readStorage(STORAGE_KEYS.campus) ?? "";
    const queryCampus =
      new URLSearchParams(window.location.search).get("kampus") ?? "";
    setPreviousRef(readStorage(STORAGE_KEYS.submittedRef));

    if (draft) {
      setFields({
        parentName: draft.parentName ?? "",
        phone: draft.phone ?? "",
        email: draft.email ?? "",
        studentName: draft.studentName ?? "",
        level: draft.level ?? "",
        grade: draft.grade ?? "",
        campus: queryCampus || draft.campus || campusPref,
        note: draft.note ?? "",
      });
      const savedStep = Math.min(3, Math.max(1, draft.step ?? 1));
      setStep(savedStep);
      setRestored(true);
    } else if (queryCampus || campusPref) {
      setFields((f) => ({ ...f, campus: queryCampus || campusPref }));
    }
    loadedRef.current = true;
  }, []);

  /* Otomatik taslak kaydı (depolanan değer) */
  useEffect(() => {
    if (!loadedRef.current || submittedRef.current) return;
    writeJSON(STORAGE_KEYS.draft, {
      ...fields,
      step,
      updatedAt: new Date().toISOString(),
    } satisfies LeadDraft);
  }, [fields, step]);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validateStep = (s: number): boolean => {
    const next: typeof errors = {};
    if (s === 1) {
      if (fields.parentName.trim().length < 3)
        next.parentName = "Adınızı ve soyadınızı yazın.";
      if (!isValidPhone(fields.phone))
        next.phone = "Geçerli bir telefon yazın (örn. 05xx xxx xx xx).";
      if (fields.email.trim() && !EMAIL_RE.test(fields.email.trim()))
        next.email = "E-posta biçimi hatalı görünüyor.";
    }
    if (s === 2) {
      if (!fields.level) next.level = "Kademeyi seçin.";
      if (!fields.campus) next.campus = "Kampüs tercihini seçin.";
    }
    if (s === 3 && !kvkkConsent) {
      next.kvkk = "Devam etmek için Aydınlatma Metni onayı gereklidir.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const clearDraft = () => {
    removeStorage(STORAGE_KEYS.draft);
    setFields(EMPTY);
    setStep(1);
    setErrors({});
    setRestored(false);
  };

  const submit = async () => {
    if (!validateStep(3)) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/on-kayit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          kvkkConsent,
          contactConsent,
          website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        reference?: string;
        mode?: string;
        error?: string;
      } | null;
      if (!res.ok || !data?.ok || !data.reference) {
        throw new Error(data?.error || "Başvuru iletilemedi.");
      }
      submittedRef.current = true;
      removeStorage(STORAGE_KEYS.draft);
      writeStorage(STORAGE_KEYS.submittedRef, data.reference);
      setReference(data.reference);
      setSubmitMode(data.mode ?? "");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Başvuru iletilemedi. Lütfen tekrar deneyin."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- Başarı ekranı ---------- */
  if (reference) {
    return (
      <div className="rounded-cards bg-paper-white p-6 shadow-sm md:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bumble-honey text-bumble-ink">
          <CheckCircle2 size={28} aria-hidden />
        </span>
        <h2 className="mt-6 text-heading font-bold text-bumble-ink">
          Ön kaydınız alındı
        </h2>
        <p className="mt-3 max-w-xl text-body leading-relaxed text-graphite">
          Teşekkürler{fields.parentName ? ` ${fields.parentName}` : ""}. Başvuru
          numaranız:{" "}
          <strong className="whitespace-nowrap text-bumble-ink">{reference}</strong>
          {fields.campus ? ` · ${fields.campus}` : ""}
          {fields.level ? ` · ${fields.level}` : ""}. Bu numarayı görüşmelerinizde
          kullanabilirsiniz.
        </p>

        <h3 className="mt-8 text-body font-semibold text-bumble-ink">Sırada ne var?</h3>
        <ol className="mt-4 space-y-4">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bumble-ink text-paper-white">
              <Check size={15} aria-hidden />
            </span>
            <p className="text-body-sm text-graphite">
              <strong className="text-bumble-ink">1. Ön kayıt formu</strong> — tamamlandı ✓
            </p>
          </li>
          {REGISTRATION_STEPS.slice(1).map((s, i) => (
            <li key={s.title} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-body-sm font-bold text-bumble-ink">
                {i + 2}
              </span>
              <p className="text-body-sm text-graphite">
                <strong className="text-bumble-ink">{s.title}</strong> — {s.desc}
              </p>
            </li>
          ))}
        </ol>

        {submitMode === "local" && (
          <p className="mt-6 rounded-buttons bg-mist px-4 py-3 text-caption leading-relaxed text-graphite">
            Not: Bu önizleme ortamında başvuru numarası yerel olarak üretildi.
            Yayın ortamında <code>LEAD_WEBHOOK_URL</code> tanımlandığında kayıt
            doğrudan okulun öğrenci işleri/CRM sistemine aktarılır.
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-buttons bg-bumble-ink px-6 py-3 text-body font-medium text-paper-white transition-colors hover:bg-charcoal"
          >
            Ana sayfaya dön
          </Link>
          <a
            href={OFFICIAL.catalog}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-buttons px-6 py-3 text-body font-medium text-bumble-ink underline decoration-bumble-ink/40 decoration-2 underline-offset-4 hover:decoration-bumble-ink"
          >
            <BookOpen size={17} aria-hidden />
            Tanıtım kataloğunu inceleyin
          </a>
        </div>
      </div>
    );
  }

  /* ---------- Form ---------- */
  return (
    <div className="rounded-cards bg-paper-white p-6 shadow-sm md:p-10">
      {previousRef && (
        <p className="mb-6 rounded-buttons bg-bumble-honey/50 px-4 py-3 text-body-sm text-bumble-ink">
          Bu cihazdan alınmış bir başvurunuz bulunuyor:{" "}
          <strong>{previousRef}</strong>. Dilerseniz yeni bir öğrenci için yeniden
          başvuru oluşturabilirsiniz.
        </p>
      )}
      {restored && (
        <p aria-live="polite" className="mb-6 rounded-buttons bg-mist px-4 py-3 text-body-sm text-graphite">
          Taslağınız geri yüklendi — kaldığınız adımdan devam ediyorsunuz.
          Bilgiler yalnızca bu cihazda saklanır.
        </p>
      )}

      {/* İlerleme — kazanılmış ilerleme: içinde bulunulan adım dolu gösterilir */}
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Form adımları">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          const state = n < step ? "done" : n === step ? "current" : "upcoming";
          return (
            <li key={label} aria-current={state === "current" ? "step" : undefined}>
              <div
                className={`h-2 rounded-full ${
                  state === "upcoming" ? "bg-bumble-ink/15" : "bg-bumble-ink"
                }`}
              />
              <p
                className={`mt-2 flex items-center gap-1.5 text-caption font-medium ${
                  state === "upcoming" ? "text-graphite" : "text-bumble-ink"
                }`}
              >
                {state === "done" ? (
                  <Check size={14} aria-hidden />
                ) : (
                  <span aria-hidden>{n}.</span>
                )}
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">Adım {n}</span>
              </p>
            </li>
          );
        })}
      </ol>

      {/* Spam bal küpü — insanlar görmez */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Web sitesi
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      {step === 1 && (
        <fieldset>
          <legend className="text-heading-sm font-bold text-bumble-ink">
            Veli bilgileri
          </legend>
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="f-parent" className={labelClass}>
                Veli adı soyadı *
              </label>
              <input
                id="f-parent"
                type="text"
                autoComplete="name"
                value={fields.parentName}
                onChange={set("parentName")}
                aria-invalid={!!errors.parentName}
                aria-describedby={errors.parentName ? "e-parent" : undefined}
                className={inputClass}
                placeholder="Adınız Soyadınız"
              />
              {errors.parentName && (
                <p id="e-parent" className={errorClass}>{errors.parentName}</p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="f-phone" className={labelClass}>
                  Telefon *
                </label>
                <input
                  id="f-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={fields.phone}
                  onChange={set("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "e-phone" : undefined}
                  className={inputClass}
                  placeholder="05xx xxx xx xx"
                />
                {errors.phone && <p id="e-phone" className={errorClass}>{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="f-email" className={labelClass}>
                  E-posta (isteğe bağlı)
                </label>
                <input
                  id="f-email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "e-email" : undefined}
                  className={inputClass}
                  placeholder="ornek@eposta.com"
                />
                {errors.email && <p id="e-email" className={errorClass}>{errors.email}</p>}
              </div>
            </div>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="text-heading-sm font-bold text-bumble-ink">
            Öğrenci & tercih
          </legend>
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="f-student" className={labelClass}>
                Öğrencinin adı (yalnızca adı yeterli)
              </label>
              <input
                id="f-student"
                type="text"
                autoComplete="off"
                value={fields.studentName}
                onChange={set("studentName")}
                className={inputClass}
                placeholder="Öğrencinin adı"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="f-level" className={labelClass}>
                  Kademe *
                </label>
                <select
                  id="f-level"
                  value={fields.level}
                  onChange={set("level")}
                  aria-invalid={!!errors.level}
                  aria-describedby={errors.level ? "e-level" : undefined}
                  className={inputClass}
                >
                  <option value="">Seçiniz</option>
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                {errors.level && <p id="e-level" className={errorClass}>{errors.level}</p>}
              </div>
              <div>
                <label htmlFor="f-grade" className={labelClass}>
                  Sınıf
                </label>
                <select
                  id="f-grade"
                  value={fields.grade}
                  onChange={set("grade")}
                  className={inputClass}
                >
                  <option value="">Seçiniz</option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="f-campus" className={labelClass}>
                  Kampüs *
                </label>
                <select
                  id="f-campus"
                  value={fields.campus}
                  onChange={set("campus")}
                  aria-invalid={!!errors.campus}
                  aria-describedby={errors.campus ? "e-campus" : undefined}
                  className={inputClass}
                >
                  <option value="">Seçiniz</option>
                  {CAMPUS_NAMES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.campus && <p id="e-campus" className={errorClass}>{errors.campus}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="f-note" className={labelClass}>
                Notunuz (isteğe bağlı)
              </label>
              <textarea
                id="f-note"
                rows={3}
                maxLength={500}
                value={fields.note}
                onChange={set("note")}
                className={inputClass}
                placeholder="Merak ettikleriniz, uygun arama saatiniz…"
              />
            </div>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="text-heading-sm font-bold text-bumble-ink">
            Onay & gönderim
          </legend>

          <dl className="mt-6 grid gap-x-6 gap-y-3 rounded-cards bg-mist p-5 text-body-sm sm:grid-cols-2">
            <div>
              <dt className="text-graphite">Veli</dt>
              <dd className="font-semibold text-bumble-ink">{fields.parentName || "—"}</dd>
            </div>
            <div>
              <dt className="text-graphite">Telefon</dt>
              <dd className="font-semibold text-bumble-ink">{fields.phone || "—"}</dd>
            </div>
            <div>
              <dt className="text-graphite">Öğrenci</dt>
              <dd className="font-semibold text-bumble-ink">
                {fields.studentName || "—"}
                {fields.grade ? ` · ${fields.grade}` : ""}
              </dd>
            </div>
            <div>
              <dt className="text-graphite">Tercih</dt>
              <dd className="font-semibold text-bumble-ink">
                {fields.campus || "—"}
                {fields.level ? ` · ${fields.level}` : ""}
              </dd>
            </div>
          </dl>

          <div className="mt-6 space-y-4">
            <label className="flex cursor-pointer items-start gap-3 text-body-sm leading-relaxed text-bumble-ink">
              <input
                type="checkbox"
                checked={kvkkConsent}
                onChange={(e) => {
                  setKvkkConsent(e.target.checked);
                  setErrors((err) => ({ ...err, kvkk: undefined }));
                }}
                aria-invalid={!!errors.kvkk}
                aria-describedby={errors.kvkk ? "e-kvkk" : undefined}
                className="mt-1 h-5 w-5 shrink-0 accent-[#202020]"
              />
              <span>
                Kişisel verilerimin ön kayıt sürecinde işlenmesine ilişkin{" "}
                <a
                  href={OFFICIAL.privacyNotice}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline decoration-bumble-honey decoration-2 underline-offset-2"
                >
                  Aydınlatma Metni
                </a>
                &apos;ni okudum ve kabul ediyorum. *
              </span>
            </label>
            {errors.kvkk && <p id="e-kvkk" className={errorClass}>{errors.kvkk}</p>}

            <label className="flex cursor-pointer items-start gap-3 text-body-sm leading-relaxed text-bumble-ink">
              <input
                type="checkbox"
                checked={contactConsent}
                onChange={(e) => setContactConsent(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[#202020]"
              />
              <span>
                Kayıt dönemleri, bursluluk sınavı ve tanıtım günleri hakkında
                bana telefon/e-posta ile bilgi verilmesini istiyorum.
                (İsteğe bağlıdır; onayı dilediğiniz an geri alabilirsiniz.)
              </span>
            </label>
          </div>

          {submitError && (
            <p role="alert" className="mt-6 rounded-buttons bg-red-50 px-4 py-3 text-body-sm font-medium text-red-800">
              {submitError} Dilerseniz{" "}
              <a
                href={OFFICIAL.preRegistration}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                resmî ön kayıt formunu
              </a>{" "}
              kullanabilirsiniz.
            </p>
          )}
        </fieldset>
      )}

      {/* Gezinme */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="inline-flex items-center gap-2 rounded-buttons bg-mist px-5 py-3 text-body font-medium text-bumble-ink transition-colors hover:bg-bumble-honey"
          >
            <ArrowLeft size={17} aria-hidden />
            Geri
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={() => validateStep(step) && setStep(step + 1)}
            className="inline-flex items-center gap-2 rounded-buttons bg-bumble-ink px-6 py-3 text-body font-medium text-paper-white transition-colors hover:bg-charcoal"
          >
            Devam et
            <ArrowRight size={17} aria-hidden />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-buttons bg-bumble-ink px-6 py-3 text-body font-medium text-paper-white transition-colors hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Gönderiliyor…" : "Ön kaydımı gönder"}
            <ArrowRight size={17} aria-hidden />
          </button>
        )}

        <button
          type="button"
          onClick={clearDraft}
          className="ml-auto inline-flex items-center gap-1.5 rounded-buttons px-3 py-2 text-caption font-medium text-graphite transition-colors hover:bg-mist hover:text-bumble-ink"
        >
          <Trash2 size={15} aria-hidden />
          Taslağı temizle
        </button>
      </div>

      <p className="mt-6 flex items-start gap-2 text-caption leading-relaxed text-graphite">
        <ShieldCheck size={16} aria-hidden className="mt-0.5 shrink-0" />
        Taslağınız bu cihazda saklanır ve yalnızca son adımda, onayınızla
        okulumuza iletilir. İstediğiniz an taslağı silebilirsiniz.
      </p>
    </div>
  );
}
