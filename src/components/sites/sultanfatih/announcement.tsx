"use client";

import { useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getClientHydrated = () => true;
const getServerHydrated = () => false;
import Link from "next/link";
import { ArrowRight, BellRing, Sparkles, X } from "lucide-react";
import {
  STORAGE_KEYS,
  hasMeaningfulDraft,
  useStoredJSON,
  useStoredString,
  writeStorage,
  type LeadDraft,
} from "./storage";

/**
 * En üst duyuru şeridi — "sahip olunan" dış tetikleyici.
 *
 * İki hali var:
 * 1. Kampanya: 2026–2027 ön kayıt duyurusu (kapatılabilir, tercihi hatırlanır).
 * 2. Devam et: Cihazda yarım kalmış bir ön kayıt taslağı varsa (Yatırım
 *    evresinde depolanan değer), şerit "bir sonraki tetikleyiciyi yükler"
 *    ve kullanıcıyı kaldığı adıma geri çağırır.
 */
export function AnnouncementBar() {
  const draft = useStoredJSON<LeadDraft>(STORAGE_KEYS.draft);
  const campaignDismissed = useStoredString(STORAGE_KEYS.announcementDismissed);
  const [resumeHidden, setResumeHidden] = useState(false);
  // Şerit yalnızca istemcide, depolama okunabildikten sonra belirir (SSR uyumu)
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    getClientHydrated,
    getServerHydrated
  );

  const isResume = hasMeaningfulDraft(draft);
  if (!hydrated) return null;
  if (isResume && resumeHidden) return null;
  if (!isResume && campaignDismissed) return null;

  return (
    <div className="bg-bumble-ink text-paper-white">
      <div className="mx-auto flex max-w-[var(--page-max-width)] items-center gap-3 px-6 py-2.5 md:px-8">
        {isResume ? (
          <BellRing size={16} aria-hidden className="shrink-0 text-bumble-honey" />
        ) : (
          <Sparkles size={16} aria-hidden className="shrink-0 text-bumble-honey" />
        )}
        <p className="min-w-0 flex-1 truncate text-caption">
          {isResume
            ? "Ön kayıt taslağınız bu cihazda hazır bekliyor."
            : "2026–2027 ön kayıt dönemi başladı."}
        </p>
        <Link
          href="/on-kayit"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-bumble-honey px-3.5 py-1 text-caption font-semibold text-bumble-ink transition-colors hover:bg-pollen"
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
      </div>
    </div>
  );
}
