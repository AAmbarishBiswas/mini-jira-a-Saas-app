"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex justify-between mb-4">
        <p>{session.user?.email}</p>
        <button onClick={() => signOut()} className="bg-red-500 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-500 text-white px-3 py-1 rounded"
    >
      Login with Google
    </button>
  );
}