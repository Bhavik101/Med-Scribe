import { database } from "@/appwrite/config";
import { NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function GET(_: Request, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
    const patient = await database.getDocument(
      process.env.DATABASE_ID!,
      process.env.USER_COLLECTION!,
      id,
    );
    if (patient.role === "doctor") throw new Error("Patient not found");
    const history = await database.listDocuments(
      process.env.DATABASE_ID!,
      process.env.MEDICAL_HISTORY_COLLECTION!,
      [Query.equal("pid", id), Query.orderDesc("$createdAt")],
    );
    return NextResponse.json(
      { patient, history, success: true },
      { status: 200 },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      data: null,
      message: error.message,
    });
  }
}
export async function POST(_: Request, context: { params: { id: string } }) {
  const payload = await _.json();
  try {
    const id = context.params.id;
    const patient = await database.getDocument(
      process.env.DATABASE_ID!,
      process.env.USER_COLLECTION!,
      id,
    );
    if (patient?.role === "doctor") throw new Error("Patient not found");
    const history = await database.createDocument(
      process.env.DATABASE_ID!,
      process.env.MEDICAL_HISTORY_COLLECTION!,
      ID.unique(),
      { ...payload, user_id: patient.user_id },
    );
    return NextResponse.json(
      { patient, history, success: true },
      { status: 200 },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      data: null,
      message: error.message,
    });
  }
}
