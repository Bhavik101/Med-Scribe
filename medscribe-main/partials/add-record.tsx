"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { IProfile } from "@/types";
import { useRouter } from "next/navigation";

function AddRecord({ profile }: { profile: IProfile }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function updateUser(e: ChangeEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      e.preventDefault();
      const payload = Object.fromEntries(new FormData(e.target));

      const request = await fetch("/api/patient/" + payload.pid, {
        method: "post",
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const response = await request.json();
      if (response.success) {
        alert("Record saved successfully.");
        e.target.reset();
      } else {
        alert(response.message);
      }
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={updateUser}
        className="max-w-md mt-6 rounded-md p-4 border border-neutral-200 bg-neutral-100 space-y-6"
      >
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="remark">Patient ID</Label>

          <Input name="pid" required placeholder="Enter patient's id" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Disease/Diagnosed with</Label>
          <Input
            required
            name="diagnosis"
            type="text"
            id="name"
            placeholder="eg. Fever"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="remark">Remark</Label>
          <Input
            name="remark"
            type="text"
            id="remark"
            placeholder="eg. write something"
          />
        </div>
        <div className="grid w-full uppercase  items-center gap-1.5">
          <Label htmlFor="gender">Doctor</Label>
          <Input
            name="doctor"
            type="text"
            id="gender"
            required
            value={`${profile?.first_name} ${profile?.last_name} (${profile.type})`}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="age">Place/Address</Label>
          <Input name="place" type="text" id="gender" />
        </div>
        <Button disabled={loading} className="w-full">
          Update Details
        </Button>
      </form>
    </>
  );
}

export default AddRecord;
