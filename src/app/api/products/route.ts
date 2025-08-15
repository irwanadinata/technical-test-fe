import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search") || "";

    const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/web/v1/products?page=${page}&limit=${limit}&search=${encodeURIComponent(
      search
    )}`;

    const res = await axios.get(backendURL, {
      headers: { Authorization: authHeader },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
