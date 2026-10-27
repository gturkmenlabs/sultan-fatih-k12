"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, RotateCcw, ShieldCheck, Trash2 } from "lucide-react";
import { CAMPUS_NAMES, LEVELS, REGISTRATION_STEPS } from "./data";
import {
  STORAGE_KEYS,
  hasMeaningfulDraft,
  isValidPhone,
  removeStorage,
  useStoredJSON,
  writeJSON,
  type LeadDraft,
} from "./storage";

const inputClass =
  "w-full rounded-buttons bg-mist px-4 py-3 text-body text-bumble-ink placeholder:text-graphite/70 outline-none transition-shadow focus:ring-2 focus:ring-bumble-ink";
const labelClass = "mb-1.5 block text-caption font-medium text-bumble-ink";

/**
 * "Ön kaydınızı birlikte tamamlayalım" bandı — Kanca Modeli uygulaması:
 * - Süreç adımları belirsizliği (velinin iç tetikleyicisi) azaltır.
 * - Mini form yalnızca 4 alan sorar (Fogg: sürtünme ↓) ve bilgileri
 *   cihazda taslak olarak saklar (Yatırım / depolanan değer).
 * - Tam form, taslak sayesinde "2. adımdan" başlar (kazanılmış ilerleme).
 * - Gönderim ve iletişim izni yalnızca son adımda, açık onayla olur.
 */
export function LeadCta() {
  const router = useRouter();
  const storedDraft = useStoredJSON<LeadDraft>(STORAGE_KEYS.draft);
  const draft = hasMeaningfulDraft(storedDraft) ? storedDraft : null;
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [campus, setCampus] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");

  const clearDraft = () => {
    removeStorage(STORAGE_KEYS.draft);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (parentName.trim().length < 3) {
      setError("Lütfen adınızı ve soyadınızı yazın.");
      return;
    }
    if (!isValidPhone(phone)) {
      setError("Lütfen geçerli bir telefon numarası yazın (örn. 05xx xxx xx xx).");
      return;
    }
    setError("");
    const next: LeadDraft = {
      ...(draft ?? {}),
      parentName: parentName.trim(),
      phone: phone.trim(),
      campus: campus || undefined,
      level: level || undefined,
      step: 2,
      updatedAt: new Date().toISOString(),
    };
    writeJSON(STORAGE_KEYS.draft, next);
    router.push("/on-kayit");
  };

  return (
    <section id="sizi-arayalim" className="bg-bumble-honey py-16" aria-label="Ön kayıt başvurusu">
      <div className="mx-auto grid max-w-[var(--page-max-width)] items-start gap-12 px-6 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        {/* Sol: şeffaf süreç */}
        <div>
          <h2 className="text-heading-lg font-bold text-bumble-ink">
            Ön kaydınızı birlikte tamamlayalım
          </h2>
          <p className="mt-4 max-w-lg text-body text-bumble-ink/80">
            Kayıt süreci dört şeffaf adımdan oluşur. İlk adım yalnızca birkaç
            dakikanızı alır; dilediğinizde ara verip kaldığınız yerden devam
            edebilirsiniz.
          </p>

          <div
            className="mt-8 h-2 max-w-lg overflow-hidden rounded-full bg-bumble-ink/15"
            role="progressbar"
            aria-valuenow={1}
            aria-valuemin={1}
            aria-valuemax={REGISTRATION_STEPS.length}
            aria-label="Kayıt sürecinde 1. adımdasınız"
          >
            <div className="h-full w-1/4 rounded-full bg-bumble-ink" />
          </div>
          <p className="mt-2 text-caption font-medium text-bumble-ink/70">
            Şu an 1. adımdasınız
          </p>

          <ol className="mt-8 space-y-5">
            {REGISTRATION_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-body-sm font-bold ${
                    i === 0
                      ? "bg-bumble-ink text-paper-white"
                      : "bg-paper-white text-bumble-ink shadow-sm"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-body font-semibold text-bumble-ink">{step.title}</h3>
                  <p className="mt-1 max-w-lg text-body-sm text-bumble-ink/70">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Sağ: mini form / taslaktan devam */}
        <div className="rounded-cards bg-paper-white p-6 shadow-sm md:p-8">
          {draft ? (
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bumble-honey text-bumble-ink">
                <RotateCcw size={22} aria-hidden />
              </span>
              <h3 className="mt-5 text-heading-sm font-bold text-bumble-ink">
                Taslağınız sizi bekliyor
              </h3>
              <p className="mt-2 text-body-sm leading-relaxed text-graphite">
                {draft.parentName ? `${draft.parentName}, ` : ""}
                ön kayıt formunuz yarıda kalmıştı
                {draft.campus ? ` (${draft.campus}` : ""}
                {draft.level ? ` · ${draft.level}` : ""}
                {draft.campus ? ")" : ""}. Bilgileriniz yalnızca bu cihazda
                saklanıyor; gönderim yalnızca son adımda onayınızla yapılır.
              </p>
              <Link
                href="/on-kayit"
                className="mt-6 flex items-center justify-center gap-2 rounded-buttons bg-bumble-ink px-6 py-3.5 text-body font-medium text-paper-white transition-colors hover:bg-charcoal"
              >
                Kaldığım yerden devam et
                <ArrowRight size={18} aria-hidden />
              </Link>
              <button
                type="button"
                onClick={clearDraft}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-buttons px-6 py-3 text-body-sm font-medium text-graphite transition-colors hover:bg-mist hover:text-bumble-ink"
              >
                <Trash2 size={16} aria-hidden />
                Taslağı sil ve baştan başla
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <h3 className="text-heading-sm font-bold text-bumble-ink">Sizi arayalım</h3>
              <p className="mt-2 text-body-sm text-graphite">
                Dört kısa bilgi yeterli; devamı ön kayıt formunda.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="lead-name" className={labelClass}>
                    Veli adı soyadı
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    autoComplete="name"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="lead-phone" className={labelClass}>
                    Telefon
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05xx xxx xx xx"
                    className={inputClass}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lead-campus" className={labelClass}>
                      Kampüs tercihi
                    </label>
                    <select
                      id="lead-campus"
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Seçiniz</option>
                      {CAMPUS_NAMES.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="lead-level" className={labelClass}>
                      Kademe
                    </label>
                    <select
                      id="lead-level"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Seçiniz</option>
                      {LEVELS.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {error && (
                <p role="alert" className="mt-4 rounded-buttons bg-red-50 px-4 py-3 text-body-sm font-medium text-red-800">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-buttons bg-bumble-ink px-6 py-3.5 text-body font-medium text-paper-white transition-colors hover:bg-charcoal"
              >
                Ön kayıda devam et
                <ArrowRight size={18} aria-hidden />
              </button>
              <p className="mt-4 flex items-start gap-2 text-caption leading-relaxed text-graphite">
                <ShieldCheck size={16} aria-hidden className="mt-0.5 shrink-0" />
                Bu adımda bilgiler yalnızca cihazınızda taslak olarak saklanır.
                Okulumuza iletim ve iletişim izni, formun son adımında ayrı
                onayınızla gerçekleşir.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
