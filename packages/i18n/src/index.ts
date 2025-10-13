import en from "../locales/en.json";
import tr from "../locales/tr.json";

type Dict = Record<string, string>;
const dicts: Record<string, Dict> = { en, tr };

let current: Dict = en;

export function setLocale(locale: "en" | "tr" = "en") {
  current = dicts[locale] ?? en;
}

export function t(key: string): string {
  return current[key] ?? key;
}
