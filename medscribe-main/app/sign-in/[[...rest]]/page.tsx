import React from "react";
import { SignIn } from "@clerk/nextjs";

function LoginPage() {
  return (
    <section className="p-4 grid h-full w-full place-items-center">
      <SignIn />
    </section>
  );
}

export default LoginPage;
