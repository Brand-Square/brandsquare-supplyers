import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.url.includes("/dashboard") || req.url.includes("/product-sourcing")) {
    if (req.cookies.get("token")?.value) {
      return NextResponse.next();
    } else {
      const nextUrl = new URL(req.nextUrl.origin).toString();
      return NextResponse.redirect(`${nextUrl}auth/login`);
    }
  }
}
