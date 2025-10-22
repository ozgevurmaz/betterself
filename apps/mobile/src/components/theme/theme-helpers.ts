import { Tokens } from "./tokens";

export type HabitKey =
  | "habit1"
  | "habit2"
  | "habit3"
  | "habit4"
  | "habit5"
  | "habit6";

export function getHabitColor(
  colors: Tokens,
  habitKey?: HabitKey,
  fallback?: string
) {
  const fromMap =
    (colors as any)?.habits?.[habitKey ?? ""] ||
    (colors as any)?.[habitKey ?? ""]; 
  return fromMap || fallback || colors.primary;
}