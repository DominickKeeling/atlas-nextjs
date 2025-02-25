"use server";

import { revalidatePath } from "next/cache";
import { insertTopic, insertQuestion, incrementVotes, insertAnswer, updateAsAnswer } from "./data";
import { redirect } from "next/navigation";


export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    if (topic) {
      redirect(`/ui/topics/${topic.id}`);
    }
  }
}

export async function addQuestion(question: FormData) {
  try {
    insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: 0,
    });
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function addVote(data: FormData) {
  const voteId = data.get("id") as string;
  console.log("Received vote ID from FormData:", voteId);

  if (!voteId) {
    console.error("SERVER: Missing vote ID");
    return;
  }

  try {
    console.log("Calling incrementVotes with ID:", voteId);
    await incrementVotes(voteId);
    console.log("incrementVotes completed for ID:", voteId);

    revalidatePath("/ui/topics/[id]", "page");
    console.log("Path revalidated for /ui/topics/[id]");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}

export async function addAnswer(data: FormData) {
  const question = data.get("question_id") as string;
  const answer = data.get("answer") as string;

  console.log("🔍 Received form data:", { question, answer });

  if (!question || !answer) {
    throw new Error("Missing required fields.");
  }

  try {
    await insertAnswer(question, answer);
    revalidatePath(`/ui/questions/${question}`);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add answer.");
  }
}

export async function setAnswer(data: FormData) {
  const question = data.get("question_id") as string;
  const answer = data.get("answer_id") as string;

  if (!question || !answer) {
    throw new Error("Missing required fields.");
  }
  try {
    await updateAsAnswer(question, answer);
    revalidatePath(`/ui/questions/${question}`);
  } catch (error) {
    console.error("Error accepting answer:", error);
    throw new Error("Failed to accept answer.");
  }
}