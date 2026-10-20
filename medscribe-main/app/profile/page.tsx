import AddRecord from "@/partials/add-record";
import GetPatientData from "@/partials/get-patient-data";
import Header from "@/partials/header";
import { IMedicalResponse, IProfile } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { use } from "react";

async function getUserData() {
  try {
    return await fetch(process.env.NEXT_PUBLIC_CLIENT_URL + "/api/profile", {
      headers: {
        Cookie: cookies().toString(),
      },
    }).then((data) => data.json());
  } catch (error) {
    console.log(error);
    return { error };
  }
}
function ProfilePage() {
  const profile = use(getUserData());
  const {
    MEDICAL_HISTORY,
    PROFILE,
  }: { PROFILE: IProfile; MEDICAL_HISTORY: IMedicalResponse } = profile.data;
  if (!PROFILE) return redirect("/onboarding");
  return (
    <section className="h-full w-full flex flex-col">
      <div className="p-4 md:p-8 w-full">
        <Header />
      </div>
      <main className="w-full flex p-4 flex-wrap gap-6">
        <aside className="md:px-8 lg:px-12 w-full md:w-1/2">
          <h2 className="text-lg font-semibold">Medical Data</h2>
          <p className="text-neutral-700 mb-6">
            Keep better track of your medical history with{" "}
            <strong>
              <span className="text-red-700">Med</span>Scribe
            </strong>
          </p>
          {PROFILE.role === "doctor" && <AddRecord profile={PROFILE} />}
        </aside>

        <aside className="w-full md:flex-1">
          <code className="rounded-md p-1 bg-foreground text-secondary max-w-fit mb-2 inline-block">
            My id: {PROFILE.$id}
          </code>
          {PROFILE?.role === "doctor" ? (
            <GetPatientData />
          ) : (
            <main className="w-full md:w-1/2 space-y-6">
              <p className="text-sm text-neutral-700">
                Previous Medical Events
              </p>
              <section className="space-y-4">
                {MEDICAL_HISTORY?.total > 0 ? (
                  MEDICAL_HISTORY.documents.map((doc) => (
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
              </section>
            </main>
          )}
        </aside>
      </main>
    </section>
  );
}

export default ProfilePage;
