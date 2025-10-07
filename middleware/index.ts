import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies";

export const middleware = async (req : NextRequest) => {
    const sessionCookie = await getSessionCookie(req);

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|assets).*)"
    ],
};