"use client";

import { useSignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { isLoaded, signIn } = useSignIn();

  if (!isLoaded) {
    // Handle loading state
    return (
        <>Loading</>
    )
  }

  return <div>The current sign-in attempt status is {signIn?.status}.</div>;
}