"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/lib/api/auth";

export default function AuthInit() {
  const { setAccessToken, setLoading, clear } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await authApi.refresh();
        setAccessToken(data.access_token);
      } catch {
        clear();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return null;
}
