import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

type RouteContext = {
    params: Promise<{
        path: string[];
    }>;
};

async function handler(
    request: NextRequest,
    context: RouteContext
) {
    // await params
    const { path } = await context.params;

    const joinedPath = path.join("/");

    const url = new URL(request.url);

    const targetUrl = `${API_URL}/${joinedPath}${url.search}`;

    console.log("target_url", targetUrl);

    // Forward cookies
    const cookieHeader = request.headers.get("cookie") || "";

    const headers = new Headers();

    headers.set("cookie", cookieHeader);

    // Forward content-type
    const contentType = request.headers.get("content-type");

    if (contentType) {
        headers.set("content-type", contentType);
    }

    // Forward authorization header
    const authHeader = request.headers.get("authorization");

    if (authHeader) {
        headers.set("authorization", authHeader);
    }

    let body: BodyInit | undefined;

    if (!["GET", "HEAD"].includes(request.method)) {
        body = await request.arrayBuffer();
    }

    const backendResponse = await fetch(targetUrl, {
        method: request.method,
        headers,
        body,
    });

    const responseBody = await backendResponse.arrayBuffer();

    const nextResponse = new NextResponse(responseBody, {
        status: backendResponse.status,
    });

    // Forward content-type
    const resContentType =
        backendResponse.headers.get("content-type");

    if (resContentType) {
        nextResponse.headers.set(
            "content-type",
            resContentType
        );
    }

    // Forward set-cookie
    const setCookie =
        backendResponse.headers.get("set-cookie");

    if (setCookie) {
        nextResponse.headers.set("set-cookie", setCookie);
    }

    return nextResponse;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;