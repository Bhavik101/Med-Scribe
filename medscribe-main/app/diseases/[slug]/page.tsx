import { IDisease } from "@/types";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";

interface Props {
  params: { slug: string };
}

async function getDisease(slug: string) {
  const cookie = cookies().toString();
  const req = await fetch(
    process.env.NEXT_PUBLIC_CLIENT_URL + "/api/diseases/" + slug,
    {
      headers: {
        Cookie: cookie,
      },
    }
  );
  return req.json();
}
function DiseaseDetails(context: Props) {
  const { slug } = context.params;
  const disease: { data: IDisease } = use(getDisease(slug));

  return (
    <div className="p-4 md:p-6">
      <title>{disease.data.name}</title>
      <meta name="description" content={disease.data.description} />
      <section
        style={{ background: 'url("/banner-scaled.jpg") center/cover' }}
        className="text-center p-4 py-10 md:p-6 md:py-16 lg:p-8 lg:py-20 rounded-2xl"
      >
        <article className="flex items-center justify-center">
          <Image src="/icon.svg" width={40} height={40} alt="Logo" />
          <p className="font-semibold">Med Scribe</p>
        </article>
        <div className="flex items-center gap-1 justify-center my-2">
          <Link href="/">Home</Link>
          <small>/</small>
          <Link href={`/diseases/${disease.data.slug}`}>
            {disease.data.name}
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-black">{disease.data.name}</h1>
      </section>
      <section className="p-4 md:p-6 space-y-6">
        <p>{disease.data.description}</p>
        <div>
          <h2 className="font-medium text-lg">Symptoms: </h2>
          <ul className="list-disc list-inside">
            {disease.data.symptoms?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-medium text-lg">Remedies: </h2>
          <ul className="list-disc list-inside">
            {disease.data.remedies?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default DiseaseDetails;
