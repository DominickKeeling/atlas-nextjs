import { NextResponse } from "next/server";
import { fetchQuestions } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const topicId = (await params).id;

    if (!topicId) {
      return NextResponse.json(
        { error: "A valid topic ID is required." },
        { status: 400 }
      );
    }

    const questionList = await fetchQuestions(topicId);
    return NextResponse.json(questionList);
  } catch (err) {
    console.error("Error retrieving questions:", err);
    return NextResponse.json(
      { error: "Unable to retrieve questions at this time." },
      { status: 500 }
    );
  }
}
