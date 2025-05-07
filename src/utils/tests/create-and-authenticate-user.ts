// External libraries
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  // Create new user
  await request(app.server).post("/users").send({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "12345678",
  });

  // Authenticate user
  const authenticate = await request(app.server).post("/sessions").send({
    email: "johndoe@example.com",
    password: "12345678",
  });

  const { token } = authenticate.body;

  return { token };
}
