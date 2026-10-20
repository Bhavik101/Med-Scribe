import { database } from "@/appwrite/config";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET() {
  try {
    const data = await database.listDocuments(
      process.env.DATABASE_ID!,
      process.env.DISEASES_COLLECTION!,
      [Query.select(["name", "description", "slug"])]
    );
    return NextResponse.json({
      error: false,
      message: "Disease information fetched successfully.",
      data,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: true, message: error.message, data: [] },
      { status: 404 }
    );
  }
}
