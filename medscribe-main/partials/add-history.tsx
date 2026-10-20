"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AddHistory() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  async function saveHistory() {
    const user_id = JSON.parse(sessionStorage.getItem("user") ?? "").$id;
    setLoading(true);
    await fetch(process.env.NEXT_PUBLIC_CLIENT_URL + "/api/profile", {
      method: "post",
      body: JSON.stringify({
        diagnosis: "Cold and Fever",
        remark: "Some random remark",
        doctor: "Dr. Umesh Deshmukh (Heart Surgeon)",
        place: "Bhagavati Hospital, Nanded",
        pid: user_id,
        user_id: user?.id,
      }),
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    setLoading(false);
    router.refresh();
  }
  return (
    <>
      <Button disabled={loading} onClick={saveHistory}>
        Add history
      </Button>
    </>
  );
}

export default AddHistory;
