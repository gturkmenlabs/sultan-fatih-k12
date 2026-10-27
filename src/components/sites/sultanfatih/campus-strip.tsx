"use client";

import { Check, MapPin } from "lucide-react";
import { STORAGE_KEYS, removeStorage, useStoredString, writeStorage } from "./storage";

/** Kampüs tercihi, detay kartının içinde tutulur ve ön kayıt formuna taşınır. */
export function CampusPreference({ name }: { name: string }) {
  const preferred = useStoredString(STORAGE_KEYS.campus);
  const selected = preferred === name;

  const choose = () => {
    if (selected) removeStorage(STORAGE_KEYS.campus);
    else writeStorage(STORAGE_KEYS.campus, name);
  };

  return (
    <div className="mt-5 rounded-buttons bg-mist p-4">
      <button
        type="button"
        onClick={choose}
        aria-pressed={selected}
        aria-label={`${name}: ${selected ? "kampüs tercihini kaldır" : "benim kampüsüm olarak seç"}`}
        className={`inline-flex min-h-11 items-center gap-2 rounded-buttons px-4 py-2.5 text-body-sm font-semibold transition-colors ${selected ? "bg-primary-navy text-paper-white hover:bg-brand-blue" : "bg-paper-white text-primary-navy shadow-sm hover:bg-pollen"}`}
      >
        {selected ? <Check size={17} aria-hidden /> : <MapPin size={17} aria-hidden />}
        {selected ? "Tercihiniz kaydedildi" : "Benim kampüsüm olarak seç"}
      </button>
      <p aria-live="polite" className="mt-2 text-caption text-text-main">
        {selected
          ? `${name} bu cihazda hatırlanır ve ön kayıt formunda hazır seçili gelir.`
          : "Kampüs tercihinizi bu cihazda hatırlayabiliriz. Seçiminizi dilediğiniz zaman değiştirebilirsiniz."}
      </p>
    </div>
  );
}
