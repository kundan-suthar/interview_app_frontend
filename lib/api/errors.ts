const ERROR_MESSAGES: Record<string, string> = {
  // Auth
  LOGIN_BAD_CREDENTIALS: "Invalid email or password",
  LOGIN_USER_NOT_VERIFIED: "Please verify your email before signing in",
  USER_ALREADY_EXISTS: "An account with this email already exists",
  USER_NOT_EXISTS: "No account found with this email",
  REGISTER_INVALID_PASSWORD: "Password does not meet requirements",

  // Generic
  UNAUTHORIZED: "You are not authorized to perform this action",
  FORBIDDEN: "Access denied",
  NOT_FOUND: "The requested resource was not found",
  INTERNAL_SERVER_ERROR: "Something went wrong. Please try again later",
};

export function getErrorMessage(detail: unknown): string {
  if (typeof detail === "string") {
    return ERROR_MESSAGES[detail] ?? detail; // fallback to raw if no mapping
  }

  if (Array.isArray(detail)) {
    // FastAPI validation errors come as array
    return detail[0]?.msg || "Validation error";
  }

  return "Something went wrong";
}
