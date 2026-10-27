"use client";

import { useEffect, useState } from "react";
import { OFFICIAL } from "./data";
import { STORAGE_KEYS, readStorage, writeJSON } from "./storage";

/**
 * Çerez onay kartı — sahip olunan (owned) tetikleyicilerin ön koşulu
 * izindir. Kabul de ret de tek tıkladır; seçim cihazda hatırlanır ve
 * kart bir daha gösterilmez. Varsayılan/onaylı kutucuk kullanılmaz.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readStorage(STORAGE_KEYS.cookieConsent)) return;
    const timer = window.setTimeout(() => setVisible(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  const choose = (choice: "accepted" | "rejected") => {
    writeJSON(STORAGE_KEYS.cookieConsent, {
      choice,
      at: new Date().toISOString(),
    });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Çerez bildirimi"
      className="fixed bottom-24 left-4 right-4 z-[60] rounded-cards bg-paper-white p-5 shadow-sm ring-1 ring-bumble-ink/10 sm:right-auto sm:max-w-md md:bottom-6 md:left-6"
    >
      <h2 className="text-body font-semibold text-bumble-ink">Çerezler ve gizliliğiniz</h2>
      <p className="mt-2 text-body-sm leading-relaxed text-graphite">
        Sitemiz; kampüs tercihiniz ve ön kayıt taslağınız gibi seçimlerinizi
        bu cihazda hatırlamak için yerel depolama kullanır. Ayrıntılar için{" "}
        <a
          href={OFFICIAL.cookiePolicy}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-bumble-ink underline decoration-bumble-honey decoration-2 underline-offset-2"
        >
          Çerez Politikası
        </a>{" "}
        ve{" "}
        <a
          href={OFFICIAL.privacyNotice}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-bumble-ink underline decoration-bumble-honey decoration-2 underline-offset-2"
        >
          Aydınlatma Metni
        </a>{" "}
        sayfalarına bakabilirsiniz.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="flex-1 rounded-buttons bg-bumble-ink px-4 py-2.5 text-body-sm font-semibold text-paper-white transition-colors hover:bg-charcoal"
        >
          Kabul et
        </button>
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="flex-1 rounded-buttons bg-mist px-4 py-2.5 text-body-sm font-semibold text-bumble-ink transition-colors hover:bg-bumble-honey"
        >
          Reddet
        </button>
      </div>
    </div>
  );
}
