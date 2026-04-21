import { create } from "zustand";
import { createAuthSlice, AuthState } from "./slices/authSlice";
import {createInterviewState, InterviewState} from "./slices/interviewSlice"
type Store = AuthState & InterviewState;

export const useAppStore = create<Store>()((...a) => ({
  ...createAuthSlice(...a),
  ...createInterviewState(...a)
}));