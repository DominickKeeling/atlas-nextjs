import { NextResponse } from "next/server";
import { fetchAnswers } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const questionId = ( await params).id;

    if (!questionId) {
      return NextResponse.json(
        { error: "A valid question ID is required." },
        { status: 400 }
      );
    }

    const answerList = await fetchAnswers(questionId);
    return NextResponse.json(answerList);
  } catch (err) {
    console.error("Error retrieving answers:", err);
    return NextResponse.json(
      { error: "Unable to fetch answers at this time." },
      { status: 500 }
    );
  }
}
