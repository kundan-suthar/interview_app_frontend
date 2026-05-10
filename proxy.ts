import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/interviewChat"];

const isProtected = (path: string) => {
  return protectedRoutes.some((route) => path.startsWith(route));
};

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const token = req.cookies.get("refresh_token")?.value;
  const isVerified = req.cookies.get("is_verified")?.value === "True";

  const protectedRoute = isProtected(path);

  // ✅ 1. If protected route → must be logged in
  if (protectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ 2. If protected route → must be verified
    if (protectedRoute && token && !isVerified) {
      console.log("hello")
      return NextResponse.redirect(new URL("/verifyEmailDetails", req.url));
    }


  // ✅ 3. Prevent verified users from going back to auth pages
  if ((path === "/login" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};