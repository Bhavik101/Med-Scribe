import React from "react";
import { SignUp } from "@clerk/nextjs";

function RegisterPage() {
  return (
    <section className="p-4 grid place-items-center h-full w-full">
      <SignUp />
    </section>
  );
}

export default RegisterPage;
