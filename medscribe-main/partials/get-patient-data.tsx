"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMedicalHistory, IProfile } from "@/types";
import React, { ChangeEvent, useState } from "react";

interface IResponse {
  history: { documents: IMedicalHistory[]; total: number };
  patient: IProfile;
}

function GetPatientData() {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState<null | IResponse>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function getUser(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const req = await fetch("/api/patient/" + user, {
      credentials: "include",
    });
    const data = await req.json();
    setLoading(false);
    if (!data.success) {
      return setError(data.message);
    } else {
      setProfile(data);
      setError("");
    }
  }
  return (
    <section className=" flex-1 space-y-6">
      <main className="rounded-md bg-neutral-50 p-4 self-start  max-w-md border">
        <h2 className="font-medium text-lg">Get Patients medical history</h2>
        <form onSubmit={getUser} className="space-y-4">
          <p>Enter patient&apos;s id</p>
          <small>Please check profile page to get the id</small>
          <Input
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter patient's id"
            className="max-w-sm"
          />
          <Button disabled={loading} type="submit">
            Get Data
          </Button>
        </form>
      </main>
      {error && (
        <aside
          style={{ background: "#ff000011" }}
          className="text-red-700 rounded-lg border max-w-md p-4"
        >
          {error}
        </aside>
      )}

      <aside
        style={{ display: profile ? "block" : "none" }}
        className="rounded-md empty:hidden  space-y-4 max-w-md"
      >
        <p>Patient Details</p>
        <article className="rounded-md bg-neutral-100 p-4 max-w-lg border">
          <h1 className="font-medium text-lg">
            {profile?.patient.first_name} {profile?.patient.last_name}
          </h1>
          <p>Date of birth: {profile?.patient.birthday}</p>
          <p>Gender: {profile?.patient.gender}</p>
        </article>
        <p>Medical History</p>
        {profile?.history?.total !== 0 ? (
          profile?.history.documents.map((doc) => (
            <article
              key={doc.$id}
              className="rounded-md bg-neutral-100 p-4 max-w-lg border"
            >
              <h1 className="font-medium text-lg">{doc.diagnosis}</h1>
              <p className="text-sm text-neutral-600">
                {new Date(doc.$createdAt).toLocaleString("en-gb", {
                  dateStyle: "full",
                })}
              </p>
              <br />
              <p className="text-sm">Remark: {doc.remark}</p>
              <br />
              <p>
                <small>With</small> {doc.doctor}
                <br />
                <small>{doc.place}</small>
              </p>
            </article>
          ))
        ) : (
          <p>No Medical History </p>
        )}
      </aside>
    </section>
  );
}

export default GetPatientData;
