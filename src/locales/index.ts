export type Lang = "es" | "en" | "fr" | "pt";
export const LANGS: Lang[] = ["es", "en", "fr", "pt"];
export const DEFAULT_LANG: Lang = "es";

type NestedRecord = { [key: string]: string | NestedRecord };

function getNestedValue(obj: NestedRecord, path: string): string {
  const keys = path.split(".");
  let current: string | NestedRecord = obj;
  for (const key of keys) {
    if (typeof current !== "object" || current === null) return path;
    current = (current as NestedRecord)[key];
  }
  return typeof current === "string" ? current : path;
}

export async function getTranslations(lang: Lang) {
  let mod;
  if (lang === "es") mod = await import("./es");
  else if (lang === "en") mod = await import("./en");
  else if (lang === "fr") mod = await import("./fr");
  else mod = await import("./pt");
  return (key: string) => getNestedValue(mod.translations as NestedRecord, key);
}

export function getLangFromStorage(): Lang {
  if (typeof localStorage === "undefined") return DEFAULT_LANG;
  const stored = localStorage.getItem("lang");
  return (LANGS.includes(stored as Lang) ? stored : DEFAULT_LANG) as Lang;
}
