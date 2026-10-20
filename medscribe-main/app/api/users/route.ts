import { getSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = cookies().get("session");
  try {
    const { sessionDatabase, sessionAccount } = getSessionClient(
      session?.value
    );
    return NextResponse.json(
      {
        users: await sessionDatabase?.listDocuments(
          "users",
          process.env.COLLECTION_ID!
        ),
        user: await sessionAccount?.get(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("ACCESS DENIED", { status: 403 });
  }
}
