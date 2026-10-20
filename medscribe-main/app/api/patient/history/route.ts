import { database } from "@/appwrite/config";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { doc_id } = await req.json();
  try {
    const akg = await database.deleteDocument(
      process.env.DATABASE_ID!,
      process.env.MEDICAL_HISTORY_COLLECTION!,
      doc_id,
    );
    console.log(akg);
    return NextResponse.json(
      { success: true, message: "Record deleted successfully" },
      { status: 201 },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
