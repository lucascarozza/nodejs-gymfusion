// External libraries
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
// Internal utilities
import { app } from "@/app";

describe("Authenticate Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should successfully authenticate", async () => {
    // Create new user
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
    });

    // Authenticate user
    const response = await request(app.server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "12345678",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ token: expect.any(String) });
  });
});
