import { NextRequest, NextResponse } from "next/server";
import { fetchAnswers } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id?: string } }
): Promise<NextResponse> {
  try {
    const questionId = params.id;

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
