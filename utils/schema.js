import { boolean } from "drizzle-orm/gel-core";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const GRADES = pgTable("grades", {
  id: serial("id").primaryKey(),
  grade: varchar("grade", { length: 10 }).notNull(),
});
export const STUDENTS = pgTable("students", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  contact: varchar("contact", { length: 15 }),
  address: varchar("address", { length: 255 }),
  grade: varchar("grade", { length: 10 }).notNull(),
});

export const ATTENDANCE = pgTable("attendance", {
  id: serial("id", { length: 11 }).primaryKey(),
  studentId: integer("studentId", { length: 11 }).notNull(),
  present: boolean("present").default(false),
  day: integer("day", { length: 11 }).notNull(),
  date: varchar("date", { length: 20 }).notNull(),
});
