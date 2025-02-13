"use client";
import Image from "next/image";
import { useSession, SessionProvider } from "next-auth/react";
import Link from "next/link";
import placeholder from "@/assets/placeholder.svg";

export default function LoggedInUser() {
  return (
    <SessionProvider>
      <UserDetails />
    </SessionProvider>
  );
}//

function UserDetails() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3 pl-3">
      <Image src={session.user?.image ?? placeholder} alt="User avatar" className="rounded-full w-8 h-8" />
      <div>
        <p>{session.user?.name ?? "User"}</p>
      </div>
    </div>
  );
}