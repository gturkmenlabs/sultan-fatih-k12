"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, BellRing, Sparkles, X } from "lucide-react";
import { OFFICIAL } from "./data";
import {
  STORAGE_KEYS,
  hasMeaningfulDraft,
  useStoredJSON,
  useStoredString,
  writeStorage,
  type LeadDraft,
} from "./storage";

const emptySubscribe = () => () => {};
const getClientHydrated = () => true;
const getServerHydrated = () => false;

/** Rehberdeki Top Bar hızlı erişim bağlantıları (masaüstünde görünür) */
const UTILITY_LINKS = [
  { label: "Kampüs Turu", href: "/kampusler#tur", external: false },
  { label: "Aday Başvurusu", href: "/on-kayit", external: false },
  { label: "Veli Portalı (K12Net)", href: OFFICIAL.k12net, external: true },
  { label: "e-Okul", href: "https://e-okul.meb.gov.tr/", external: true },
  { label: "0212 531 22 82", href: "tel:+902125312282", external: false },
] as const;

/**
 * Üst şerit (Top Bar) — lacivert zemin:
 * - Sol: "sahip olunan" dış tetikleyici. Kampanya duyurusu (kapatılabilir,
 *   tercihi hatırlanır) veya yarım ön kayıt taslağı varsa "devam et" çağrısı.
 *   Duyuru kapatılsa bile şerit, hızlı erişim bağlantılarıyla varlığını sürdürür.
 * - Sağ: rehberin Header hızlı erişim bağlantıları.
 */
export function AnnouncementBar() {
  const draft = useStoredJSON<LeadDraft>(STORAGE_KEYS.draft);
  const campaignDismissed = useStoredString(STORAGE_KEYS.announcementDismissed);
  const [resumeHidden, setResumeHidden] = useState(false);
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    getClientHydrated,
    getServerHydrated
  );

  const isResume = hasMeaningfulDraft(draft);
  const showMessage =
    hydrated && (isResume ? !resumeHidden : !campaignDismissed);

  return (
    <div className="bg-primary-navy text-paper-white">
      <div className="mx-auto flex min-h-10 max-w-[var(--page-max-width)] items-center gap-3 px-6 py-1.5 md:px-8">
        {/* Sol: duyuru mesajı */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {showMessage ? (
            <>
              {isResume ? (
                <BellRing size={16} aria-hidden className="shrink-0 text-bumble-honey" />
              ) : (
                <Sparkles size={16} aria-hidden className="shrink-0 text-bumble-honey" />
              )}
              <p className="min-w-0 truncate text-caption">
                {isResume
                  ? "Ön kayıt taslağınız bu cihazda hazır bekliyor."
                  : "2026–2027 ön kayıt dönemi başladı."}
              </p>
              <Link
                href="/on-kayit"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-bumble-honey px-3.5 py-1 text-caption font-semibold text-primary-navy transition-colors hover:bg-pollen"
              >
                {isResume ? "Kaldığım yerden devam et" : "Ön kayıt oluştur"}
                <ArrowRight size={14} aria-hidden />
              </Link>
              <button
                type="button"
                aria-label="Duyuruyu kapat"
                onClick={() => {
                  if (isResume) {
                    setResumeHidden(true);
                  } else {
                    writeStorage(STORAGE_KEYS.announcementDismissed, "1");
                  }
                }}
                className="shrink-0 rounded-full p-1 text-paper-white/70 transition-colors hover:bg-paper-white/10 hover:text-paper-white"
              >
                <X size={16} aria-hidden />
              </button>
            </>
          ) : (
            <p className="truncate text-caption text-paper-white/80">
              Özel Sultan Fatih Eğitim Kurumları · Fatih &amp; Beylikdüzü
            </p>
          )}
        </div>

        {/* Sağ: hızlı erişim */}
        <nav aria-label="Hızlı erişim" className="hidden shrink-0 items-center lg:flex">
          {UTILITY_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center">
              {i > 0 && <span aria-hidden className="mx-1 text-paper-white/30">|</span>}
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-2.5 py-1 text-caption font-medium text-paper-white/85 transition-colors hover:bg-paper-white/10 hover:text-paper-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="rounded-full px-2.5 py-1 text-caption font-medium text-paper-white/85 transition-colors hover:bg-paper-white/10 hover:text-paper-white"
                >
                  {link.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
