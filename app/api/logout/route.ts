import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cookieHeader = request.headers.get("cookie") || "";

  try {
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
    });

    const data = await backendResponse
      .json()
      .catch(() => ({ ok: backendResponse.ok }));

    const response = NextResponse.json(data, {
      status: backendResponse.status || 200,
    });

    const clearCookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    };

    response.cookies.set("refresh_token", "", clearCookieOptions);
    response.cookies.set("is_verified", "", clearCookieOptions);

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    const response = NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );

    response.cookies.set("refresh_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
    response.cookies.set("is_verified", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  }
}
