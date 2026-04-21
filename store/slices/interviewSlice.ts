import { StateCreator } from "zustand";

export interface InterviewState {
  session_id: string | null;
  duration_minutes: number | 0;
  started_at: number | null;
  setSessionId: (session_id: string | null) => void;
  setDurationMinutes: (duration_minutes: number | 0) => void;
  setStartedAt: (started_at: number | null) => void;
  clear: () => void;
}

export const createInterviewState: StateCreator<InterviewState> = (set) => ({
  session_id: null,
  duration_minutes: 0,
  started_at: null,

  setSessionId: (session_id:string | null) =>
    set({ session_id }),

  setDurationMinutes: (duration_minutes:number | 0) =>
    set({ duration_minutes }),

  setStartedAt: (started_at:number | null) =>
    set({ started_at }),

  clear: () => set({ session_id: null, duration_minutes: 0, started_at: null }),
});
