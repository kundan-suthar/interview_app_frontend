const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { getErrorMessage } from "./errors";

export const authApi = {
  login: async (formData: FormData) => {
    const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
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

  // logout: async () => {
  //   await fetch(`${BASE_URL}/api/v1/auth/logout`, {
  //     method: "POST",
  //     credentials: "include",
  //   });
  // },
};
