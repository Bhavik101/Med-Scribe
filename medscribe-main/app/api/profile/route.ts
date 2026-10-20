import { database } from "@/appwrite/config";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function GET() {
  const user = await currentUser();
  if (!user)
    return NextResponse.json(
      { error: true, message: "Please sign in" },
      { status: 403 }
    );

  const profile = await database.listDocuments(
    process.env.DATABASE_ID!,
    process.env.USER_COLLECTION!,
    [Query.equal("user_id", user.id)]
  );

  const history = await database.listDocuments(
    process.env.DATABASE_ID!,
    process.env.MEDICAL_HISTORY_COLLECTION!,
    [Query.equal("user_id", user.id), Query.orderDesc("$createdAt")]
  );
  return NextResponse.json({
    error: false,
    message: "Profile fetched successfully",
    data: { PROFILE: profile.documents[0], MEDICAL_HISTORY: history },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const history = await database.createDocument(
    process.env.DATABASE_ID!,
    process.env.MEDICAL_HISTORY_COLLECTION!,
    ID.unique(),
    body
  );
  return NextResponse.json({ history });
}
