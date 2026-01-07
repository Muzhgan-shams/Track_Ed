import { NextResponse } from "next/server";
import { db } from "../../../../utils";
import { STUDENTS } from "../../../../utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req, res) {
  const data = await req.json();
  const result = await db.insert(STUDENTS).values({
    name: data?.name,
    contact: data?.contact,
    address: data?.address,
    grade: data?.grade,
  });
  return NextResponse.json(result);
}

export async function GET(req, res) {
  const result = await db.select().from(STUDENTS);
  return NextResponse.json(result);
}

export async function DELETE(req) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  const result = await db.delete(STUDENTS).where(eq(STUDENTS.id, Number(id)));
  return NextResponse.json(result);
}
