"use client";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";

export default function VoteButton({ id, action }: { id: string; action: (data: FormData) => void }) {
  console.log("VoteButton rendered with ID:", id);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Client: Submitting form with ID:", formData.get("id"));
    await action(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="h-8 w-8 min-w-[2rem] rounded-full ring-gray-200 hover:text-atlas-teal active:bg-primary active:text-white active:outline-hidden active:ring-2 active:ring-primary"
      >
        <HandThumbUpIcon />
      </button>
    </form>
  );
}
