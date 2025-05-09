// External libraries
import { FastifyInstance } from "fastify";
import request from "supertest";
// Internal utilities
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  // Create new user
  await prisma.user.create({
    data: {
      name: "John Doe",
      role: isAdmin ? "ADMIN" : "USER",
      email: "johndoe@example.com",
      password_hash: await hash("12345678", 6),
    },
  });

  // Authenticate user
  const authenticate = await request(app.server).post("/sessions").send({
    email: "johndoe@example.com",
    password: "12345678",
  });

  const { token } = authenticate.body;

  return { token };
}
