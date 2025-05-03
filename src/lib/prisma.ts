// Internal utilities
import { env } from "@/env";

/*
 * Ensure all dependencies are installed,
 * then execute `npx prisma generate` in the terminal
 * to initialize PrismaClient.
 */
import { PrismaClient } from "generated/prisma/client";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
