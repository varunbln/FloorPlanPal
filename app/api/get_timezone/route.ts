import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const res = await fetch(
        "https://api.geotimezone.com/public/timezone?latitude=" +
            latitude +
            "&longitude=" +
            longitude
    );
    const data = await res.json();
    return NextResponse.json({ data });
}
