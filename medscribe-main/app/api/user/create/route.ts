import { database } from "@/appwrite/config";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login.");
    const body = await req.json();
    body.user_id = user?.id;
    body.emails = user.emailAddresses.map((e) => e.emailAddress);
    const user_created = await database.createDocument(
      process.env.DATABASE_ID!,
      process.env.USER_COLLECTION!,
      ID.unique(),
      body
    );

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        data: user_created,
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 403 }
    );
  }
}
