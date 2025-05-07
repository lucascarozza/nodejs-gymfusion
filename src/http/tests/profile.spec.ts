// External libraries
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
// Internal utilities
import { app } from "@/app";

describe("Profile Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should successfully get user profile", async () => {
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

    // Get user profile
    const response = await request(app.server)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({ email: "johndoe@example.com" })
    );
  });
});
