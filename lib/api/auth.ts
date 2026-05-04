const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { getErrorMessage } from "./errors";
import { useAppStore } from "@/store/useAppStore";

export const authApi = {
  login: async (formData: FormData) => {
    console.log("jdhffhulh");
    
    const response = await fetch(`${BASE_URL}/auth/jwt/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      }),
      credentials: "include",
    });
    let res = await response.json();

    if (!response.ok) {
      throw new Error(getErrorMessage(res.detail));
    }
    return res;
  },

  refresh: async () => {
    const response = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    let res = await response.json();
    if (!response.ok) throw new Error(getErrorMessage(res.detail));
    return res;
  },

  logout: async () => {
      const { accessToken } = useAppStore.getState();

    await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`  
      },
    });
  },
};
