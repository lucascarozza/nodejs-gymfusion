// External libraries
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
// Internal utilities
import { app } from "@/app";

describe("Register Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should successfully register a new user", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
    });
    
    expect(response.statusCode).toEqual(201);
  });
});
