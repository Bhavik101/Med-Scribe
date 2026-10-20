"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

function Header() {
  useEffect(() => {
    async function getUserData() {
      try {
        const response = await fetch("/api/profile", {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (data?.data?.PROFILE) {
          sessionStorage.setItem("user", JSON.stringify(data.data.PROFILE));
        }
      } catch (error) {
        console.log(error);
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
