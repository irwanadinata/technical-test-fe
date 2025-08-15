import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("product_id");

  try {
    const authHeader = req.headers.get("authorization") || "";
    const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/web/v1/product?product_id=${productId}`;

    const res = await axios.get(backendURL, {
      headers: { Authorization: authHeader },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("authorization") || "";
    const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/web/v1/product`;

    const res = await axios.post(backendURL, body, {
      headers: { Authorization: authHeader },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("authorization") || "";
    const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/web/v1/product`;

    const res = await axios.put(backendURL, body, {
      headers: { Authorization: authHeader },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("product_id");

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    const authHeader = req.headers.get("authorization") || "";
    const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/web/v1/product?product_id=${productId}`;

    const res = await axios.delete(backendURL, {
      headers: { Authorization: authHeader },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
