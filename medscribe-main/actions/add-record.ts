"server only";

import { getSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

export async function updateUser(formData: FormData) {
  "use server";
  const { name, age, gender } = Object.fromEntries(formData);
  const { sessionDatabase } = getSessionClient(cookies().get("session")?.value);
  sessionDatabase?.createDocument(
    process.env.DATABASE_ID!,
    process.env.COLLECTION_ID!,
    ID.unique(),
    { name, age: Number(age), gender }
  );
}
