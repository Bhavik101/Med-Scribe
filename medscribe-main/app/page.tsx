import Link from "next/link";
import Header from "../partials/header";
import { use } from "react";
import { cookies } from "next/headers";
import { IDiseasesResponse } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";

async function getDiseases() {
  try {
    const cookie = cookies().toString();
    const req = await fetch(
      process.env.NEXT_PUBLIC_CLIENT_URL + "/api/diseases",
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
    if (!req.ok) throw new Error("not ok");
    return req.json();
  } catch (error) {
    console.log("error", error);
    return { error: true };
  }
}
export default function Home() {
  const diseases: IDiseasesResponse = use(getDiseases());
  return (
    <>
      <section
        style={{ background: "url('/box.svg')" }}
        className="min-h-full flex justify-between items-center flex-col"
      >
        <div className="p-4 md:p-8 w-full">
          <Header />
        </div>
        <div className="flex w-full max-w-6xl items-center justify-between p-4 md:p-6 flex-wrap">
          <main className="w-full md:max-w-xl space-y-6 p-4 order-2 md:order-1">
            <span className="bg-black text-red-500 rounded-full p-2 px-4  font-medium">
              Med<span className="text-white">Scribe</span>
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold">
              Take care of your loved ones.
            </h1>
            <p className="text-neutral-800">
              Never miss an important health check up dates, appointments and
              many more with our specially crafter app.
            </p>
            <div className="flex gap-2 flex-wrap max-w-sm text-center">
              <Link
                className="w-full sm:flex-1 py-3 px-4 rounded-full bg-neutral-100 hover:bg-neutral-200 border text-neutral-800"
                href="/about"
              >
                Learn more
              </Link>

              <Link
                className="w-full sm:flex-1 py-3 px-4 rounded-full bg-neutral-800 hover:bg-neutral-900 text-white"
                href={diseases.error ? "/sign-in" : "/profile"}
              >
                {diseases.error ? "Join Us" : "Go to profile"}
              </Link>
            </div>
          </main>
          <aside className="order-1 md:order-2">
            <Image height={400} width={400} alt="MedScribe" src="/aside.webp" />
          </aside>
        </div>
        <p className="text-xs py-4 text-red-600"></p>
      </section>
      <hr />
      <section className="max-w-6xl mx-auto p-4 md:p-6 md:pt-12 ">
        {diseases.error ? (
          <section className="p-6 rounded-2xl bg-neutral-100 space-y-4">
            <p className="text-lg font-medium">
              Please sign in to see detailed information on various common
              diseases and doctors around you
            </p>
            Click here to{" "}
            <Button asChild className="rounded-full">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </section>
        ) : (
          <>
            <p className="p-4">Learn about some common diseases</p>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {diseases?.data.documents?.map((doc) => (
                <Link
                  href={"/diseases/" + doc.slug}
                  key={doc.slug}
                  className="w-full bg-card hover:border-accent-foreground border p-4 rounded-lg flex flex-col"
                >
                  <h2 className="font-medium text-lg">{doc.name}</h2>
                  <p className="text-secondary-foreground line-clamp-2">
                    {doc.description}
                  </p>
                  <small className="inline-block text-right mt-auto hover:text-red-700">
                    Read more ...
                  </small>
                </Link>
              ))}
            </section>
          </>
        )}
      </section>
    </>
  );
}
