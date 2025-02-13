import { NextResponse } from "next/server";
import { fetchTopics } from "@/lib/data";

export async function GET() {
  try {
    const topics = await fetchTopics();
    return NextResponse.json(topics, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failure to retrieve topics." },
      { status: 500 }
    );
  }
}