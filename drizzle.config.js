import { defineConfig } from "drizzle-kit";
import "dotenv/config";
// console.log("DATABASE_URL:", process.env.DATABASE_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
    ssl: true,
  },
});
