import { database } from "@/appwrite/config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export const dynamic = "force-static";
export async function GET(
  _: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;
  if (!slug)
    return NextResponse.json(
      { error: true, message: "Slug not found", data: [] },
      { status: 404 }
    );
  const doc = await database.listDocuments(
    process.env.DATABASE_ID!,
    process.env.DISEASES_COLLECTION!,
    [Query.equal("slug", [slug])]
  );
  return NextResponse.json({
    error: false,
    message: "Disease information fetched successfully.",
    data: doc.documents[0],
  });
}
