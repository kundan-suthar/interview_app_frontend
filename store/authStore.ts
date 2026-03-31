import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAccessToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,

  setAccessToken: (token) =>
    set({ accessToken: token, isAuthenticated: !!token }),

  setLoading: (loading) => set({ isLoading: loading }),

  clear: () => set({ accessToken: null, isAuthenticated: false }),
}));
