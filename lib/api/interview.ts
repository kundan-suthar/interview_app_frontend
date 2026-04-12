const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { getErrorMessage } from "./errors";
import { useAuthStore } from "@/store/authStore";

export const interviewApi = {
  chat: async (formData: FormData) => {
    const response = await fetch(`${BASE_URL}/interview/chat`, {
      method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        session_id: formData.get("session_id") as string,
        user_message: formData.get("user_message") as string,
      }),
      credentials: "include",
    });
    let res = await response.json();

    if (!response.ok) {
      throw new Error(getErrorMessage(res.detail));
    }
    return res;
  },

  
};
