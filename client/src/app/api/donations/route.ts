import { NextResponse } from "next/server";

export interface ListApiResponse<T> {
  hasMore: boolean;
  total: number;
  data: T[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const name = searchParams.get("name") || "";
  const type = searchParams.get("type") || "charities";

  try {
    const res = await fetch(
      `${process.env.SERVER_HOST}/api/${type}?page=${page}&limit=${limit}${
        name ? `&name=${name}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
