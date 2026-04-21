import { create, StateCreator } from "zustand";

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAccessToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  clear: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,

  setAccessToken: (token: string | null) =>
    set({ accessToken: token, isAuthenticated: !!token }),

  setLoading: (loading:boolean) => set({ isLoading: loading }),

  clear: () => set({ accessToken: null, isAuthenticated: false }),
});
