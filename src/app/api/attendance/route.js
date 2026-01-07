import { db } from "../../../../utils";
import { ATTENDANCE, STUDENTS } from "../../../../utils/schema";
import { eq, and, or, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const grade = searchParams.get("grade");
    const month = searchParams.get("month");

    // // 1. Validation: Prevent "syntax error at or near =" by catching undefined params
    // if (!grade || grade === "undefined" || !month || month === "undefined") {
    //   return NextResponse.json(
    //     { error: "Invalid Parameters" },
    //     { status: 400 }
    //   );
    // }

    const result = await db
      .select({
        name: STUDENTS.name,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,
        grade: STUDENTS.grade,
        studentId: STUDENTS.id,
        attendanceId: ATTENDANCE.id,
      })
      .from(STUDENTS)
      .leftJoin(
        ATTENDANCE,
        and(eq(STUDENTS.id, ATTENDANCE.studentId), eq(ATTENDANCE.date, month))
      )
      .where(eq(STUDENTS.grade, grade));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

//

export async function POST(req, res) {
  const data = await req.json();
  const result = await db.insert(ATTENDANCE).values({
    studentId: data.studentId,
    present: data.present,
    day: data.day,
    date: data.date,
  });
  return NextResponse.json(result);
}

export async function DELETE(req) {
  const searchParams = new URL(req.url).searchParams;
  const studentId = searchParams.get("studentId");
  const date = searchParams.get("date");
  const day = searchParams.get("day");
  const result = await db
    .delete(ATTENDANCE)
    .where(
      and(
        eq(ATTENDANCE.studentId, studentId),
        eq(ATTENDANCE.date, date),
        eq(ATTENDANCE.day, day)
      )
    );
  return NextResponse.json(result);
}
