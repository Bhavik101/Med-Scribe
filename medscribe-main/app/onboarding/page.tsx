"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/partials/header";
import { useUser } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface IPayload {
  [k: string]: string | undefined;
}
function Onboarding() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const handleForm = async (e: ChangeEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const payload = Object.fromEntries(new FormData(e.target)) as IPayload;
      payload.user_id = user?.id;

      const req = await fetch(
        process.env.NEXT_PUBLIC_CLIENT_URL + "/api/user/create",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      const response = await req.json();
      if (!response.success) throw new Error(response.message);
      alert(response.message);
      router.push("/profile");
      console.log("user created");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full w-full flex flex-col">
      <div className="p-4 md:p-8 w-full">
        <Header />
      </div>
      <main className="w-full flex p-4 flex-wrap gap-6">
        <section className="w-full space-y-8">
          <h1 className="font-semibold text-xl max-w-xl mx-auto">
            Please complete your profile to proceed further
          </h1>
          <form onSubmit={handleForm} className="space-y-6 mx-auto max-w-xl">
            <article>
              <p>Enter First name</p>
              <Input required name="first_name" className="max-w-sm" />
            </article>
            <article>
              <p>Enter Last name</p>
              <Input required name="last_name" className="max-w-sm" />
            </article>
            <article>
              <p>Pick date of birth</p>
              <Input
                required
                name="birthday"
                type="date"
                className="max-w-sm"
              />
            </article>
            <article className="max-w-sm">
              <p>Choose Gender</p>
              <Select name="gender">
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </article>
            <article className="max-w-sm">
              <p>Choose Role</p>
              <Select name="role">
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </article>
            <article className="max-w-sm">
              <p>Type</p>
              <small>Enter which kind of doctor you are</small>
              <Input name="type" placeholder="Eg. Cardio, General Physician" />
            </article>
            <Button disabled={loading} type="submit">
              Save changes & Update profile
            </Button>
          </form>
        </section>
      </main>
    </section>
  );
}

export default Onboarding;
