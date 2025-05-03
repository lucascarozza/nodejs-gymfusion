// External libraries
import fastify from "fastify";

/*
 * Ensure all dependencies are installed,
 * then execute `npx prisma generate` in the terminal
 * to initialize PrismaClient.
 */
import { PrismaClient } from "generated/prisma/client";

export const app = fastify();

const prisma = new PrismaClient();

// prisma.user.create({
//   data: {
//     name: "Usuário Teste",
//     email: "email@email.com",
//   },
// });
