import { useAuthStore } from "@/store/authStore";
import { authApi } from "./auth";
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token!);
  });
  failedQueue = [];
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const { accessToken, setAccessToken, clear } = useAuthStore.getState();
  

  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
  
    
  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });
  
  

  if (response.status === 401) {
    if (isRefreshing) {
      return new Promise<T>((resolve, reject) => {
        failedQueue.push({
          resolve: async (newToken: string) => {
            headers.set("Authorization", `Bearer ${newToken}`);
            const retried = await fetch(`${BASE_URL}${endpoint}`, {
              ...options,
              headers,
              credentials: "include",
            });
            resolve(retried.json());
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const data = await authApi.refresh();
      const newToken = data.access_token;
      setAccessToken(newToken);
      processQueue(null, newToken);

      headers.set("Authorization", `Bearer ${newToken}`);
      try {
        response = await fetch(`${BASE_URL}${endpoint}`, {
          ...options,
          headers,
          credentials: "include",
        });
      } catch (error) {
        
      }
    } catch (err) {
      processQueue(err, null);
      clear();
      window.location.href = "/login";
    
      throw err;
    } finally {
      isRefreshing = false;
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    if (response.status === 403 && errorData?.detail?.detail === "PROFILE_INCOMPLETE") {
      window.location.href = "/dashboard/profile";
    }

    throw new Error(errorData?.detail || "Something went wrong");
  }

  return response.json();
  } catch (error) {
    console.error("API client error:", error);
    throw error;
  }
}
