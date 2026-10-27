import { useMemo, useSyncExternalStore } from "react";

/**
 * Cihaz-içi "depolanmış değer" (stored value) yardımcıları.
 *
 * Kanca Modeli'nin Yatırım evresi bu modül üzerinden çalışır:
 * kampüs tercihi, yarım kalan ön kayıt taslağı, duyuru/çerez seçimleri
 * yalnızca kullanıcının cihazında (localStorage) tutulur; sunucuya
 * gönderim yalnızca ön kayıt formunun son adımında, açık onay ile olur.
 */

export const STORAGE_KEYS = {
  campus: "sfk-campus",
  draft: "sfk-onkayit-draft",
  submittedRef: "sfk-onkayit-ref",
  announcementDismissed: "sfk-ann-2026-dismissed",
  cookieConsent: "sfk-cookie-consent",
} as const;

/** Ön kayıt taslağı — ana sayfadaki mini form ile /on-kayit arasında ortak */
export interface LeadDraft {
  parentName?: string;
  phone?: string;
  email?: string;
  studentName?: string;
  level?: string;
  grade?: string;
  campus?: string;
  note?: string;
  applicationType?: string;
  /** Formun kaldığı adım (1–3) — kazanılmış ilerleme hissini korur */
  step?: number;
  updatedAt?: string;
}

function canUseStorage(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

export function readStorage(key: string): string | null {
  if (!canUseStorage()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Aynı sekmedeki dinleyicileri (useSyncExternalStore) haberdar eden olay */
const STORAGE_EVENT = "sfk-storage-change";

function notifyStorageChange(): void {
  try {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch {
    /* yoksay */
  }
}

export function writeStorage(key: string, value: string): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(key, value);
    notifyStorageChange();
  } catch {
    /* kota dolu / gizli mod — sessizce geç */
  }
}

export function removeStorage(key: string): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(key);
    notifyStorageChange();
  } catch {
    /* yoksay */
  }
}

export function readJSON<T>(key: string): T | null {
  const raw = readStorage(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeJSON(key: string, value: unknown): void {
  writeStorage(key, JSON.stringify(value));
}

/** Taslağın "anlamlı" olup olmadığı — kaldığın yerden devam şeridi bunu kullanır */
export function hasMeaningfulDraft(draft: LeadDraft | null): boolean {
  if (!draft) return false;
  return Boolean(
    draft.parentName?.trim() ||
      draft.phone?.trim() ||
      draft.studentName?.trim() ||
      draft.campus ||
      draft.level
  );
}

/** Telefonu karşılaştırılabilir biçime indirir: 10 haneli çekirdek numara */
export function normalizePhone(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("90") && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  return digits;
}

export function isValidPhone(input: string): boolean {
  return normalizePhone(input).length === 10;
}

/* ------------------------------------------------------------------ */
/* React kancaları — localStorage'ı dış mağaza olarak okur.            */
/* SSR'da null döner, hidratasyonda cihaz değeriyle senkronlanır;      */
/* bu yüzden effect içinde setState gerekmez.                          */
/* ------------------------------------------------------------------ */

function subscribeStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(STORAGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(STORAGE_EVENT, onChange);
  };
}

function getServerSnapshot(): string | null {
  return null;
}

export function useStoredString(key: string): string | null {
  return useSyncExternalStore(
    subscribeStorage,
    () => readStorage(key),
    getServerSnapshot
  );
}

export function useStoredJSON<T>(key: string): T | null {
  const raw = useStoredString(key);
  return useMemo(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }, [raw]);
}
