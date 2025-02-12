import React from 'react';
import { fetchQuestion, fetchAnswers } from "@/lib/data";
import { HashtagIcon } from "@heroicons/react/24/outline";
import { AnswerForm } from "@/components/AnswerForm";
import { AnswersList } from "@/components/AnswersList";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const question = await fetchQuestion(id);
  const answers = await fetchAnswers(id);

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        <HashtagIcon className="h-6 w-6 mr-3" />
        {question.title}
      </h1>
      <div>
        <AnswerForm question={question.id} />
      </div>
      <div>
        <AnswersList answers={answers} question={question.id} />
      </div>
    </div>
  );
}