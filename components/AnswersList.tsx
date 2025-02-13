import { Answer } from "@/lib/definitions";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { setAnswer } from "@/lib/actions";

function AnswerItem({ answer, question }: { answer: {id: string; answer: string; is_accepted: boolean }; question: string }) {
  return (
    <div className="border flex items-center justify-between p-6">
      <p>{answer.answer}</p>
      <form action={setAnswer}>
        <input type="hidden" name="question_id" value={question} />
        <input type="hidden" name="answer_id" value={answer.id} />
        <button type="submit">
          <CheckCircleIcon className={`h-6 w-6 ${answer.is_accepted ? "text-green-500" : "text-gray-300 hover:text-green-500"}`} />
        </button>
      </form>
    </div>
)}

export function AnswersList({ answers, question }: { answers: Answer[]; question: string }) {
  if (!answers || answers.length === 0) {
    return <div>No answers yet.</div>;
  }

  return (
    <div>
      {answers.map((answer) => (
        <AnswerItem key={answer.id} answer={answer} question={question} />
      ))}
    </div>
  )
}

