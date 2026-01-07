import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "../../../../utils";
import { ATTENDANCE, STUDENTS } from "../../../../utils/schema";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const date = searchParams.get("date");
  const grade = searchParams.get("grade");

  const result = await db
    .select({
      day: ATTENDANCE.day,
      presentCount: sql`count(${ATTENDANCE.day})`, // ✅ correct SQL count syntax
    })
    .from(ATTENDANCE)
    .innerJoin(STUDENTS, eq(ATTENDANCE.studentId, STUDENTS.id))
    .groupBy(ATTENDANCE.day)
    .where(and(eq(ATTENDANCE.date, date), eq(STUDENTS.grade, grade)))
    .orderBy(desc(ATTENDANCE.day))
    .limit(7);

  return NextResponse.json(result); // ✅ now result is plain array of rows
}
