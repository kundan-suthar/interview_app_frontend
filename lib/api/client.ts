import { useAppStore } from "@/store/useAppStore";
import { authApi } from "./auth";

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (
  error: unknown,
  token: string | null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

async function parseResponse(response: Response) {
  const contentType =
    response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const {
    accessToken,
    setAccessToken,
    clear,
  } = useAppStore.getState();

  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set(
      "Authorization",
      `Bearer ${accessToken}`
    );
  }

  if (
    !headers.has("Content-Type") &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  const makeRequest = async () => {
    return fetch(`/api/proxy${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });
  };

  let response = await makeRequest();

  // =========================
  // HANDLE 401
  // =========================

  if (response.status === 401) {
    if (isRefreshing) {
      return new Promise<T>((resolve, reject) => {
        failedQueue.push({
          resolve: async (newToken: string) => {
            try {
              headers.set(
                "Authorization",
                `Bearer ${newToken}`
              );

              const retriedResponse =
                await makeRequest();

              const retriedData =
                await parseResponse(retriedResponse);

              resolve(retriedData);
            } catch (err) {
              reject(err);
            }
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshData =
        await authApi.refresh();

      const newToken =
        refreshData.access_token;

      setAccessToken(newToken);

      processQueue(null, newToken);

      headers.set(
        "Authorization",
        `Bearer ${newToken}`
      );

      response = await makeRequest();
    } catch (err) {
      processQueue(err, null);

      clear();

      window.location.href = "/login";

      throw err;
    } finally {
      isRefreshing = false;
    }
  }

  // =========================
  // HANDLE ERRORS
  // =========================

  const data = await parseResponse(response);

  if (!response.ok) {
    if (
      response.status === 403 &&
      data?.detail?.detail ===
      "PROFILE_INCOMPLETE"
    ) {
      window.location.href =
        "/dashboard/profile";
    }

    throw new Error(
      data?.detail || "Something went wrong"
    );
  }

  return data as T;
}