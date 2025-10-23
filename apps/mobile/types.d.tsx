export type Friend = {
    id: string;
    name: string;
    username?: string;
    avatarUrl?: string;
};

export type Unit =
    | "mins" | "hours" | "kilometer" | "kg" | "gram" | "meter"
    | "piece" | "glass" | "liter" | "steps";

export type TargetValue =
    | { kind: "any" }
    | { kind: "fixed"; amount: number; unit: Unit };

export type RepeatValue =
    | { kind: "any" }
    | { kind: "daily" }
    | { kind: "weekly"; weekday: number }
    | { kind: "custom"; days: number[] };

export type ReminderValue =
    | { kind: "any" }
    | { kind: "at"; time: string }
    | { kind: "in"; minutes: number };

export type Subtask = {
  id: string;
  title: string;
  done: boolean;
};

export type HabitDraft = {
  name: string;
  emoji: string;
  color?: string;
  target: TargetValue;
  repeat: RepeatValue;
  reminder: ReminderValue;
  friends: Friend[];
  subtasks?: Subtask[]; 
};