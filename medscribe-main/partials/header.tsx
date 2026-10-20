"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

function Header() {
  useEffect(() => {
    async function getUserData() {
      try {
        const data = await fetch(
          process.env.NEXT_PUBLIC_CLIENT_URL + "/api/profile",
          {
            credentials: "include",
          }
        ).then((data) => data.json());
        sessionStorage.setItem("user", JSON.stringify(data.data.PROFILE));
      } catch (error) {
        console.log(error);
        return { error };
      }
    }
    getUserData();
  }, []);
  return (
    <header className="w-full rounded-full flex justify-between p-4 border">
      <Link href="/" className="flex gap-1 items-center">
        <Image src="/icon.svg" width={60} height={60} alt="Logo" />
        <p>Med Scribe</p>
      </Link>
      <SignedIn>
        <section className="flex items-center gap-4">
          <Link href="/profile">My Data</Link>
          <UserButton />
        </section>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
}

export default Header;
