// External libraries
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
// Internal utilities
import { app } from "@/app";

describe("Refresh Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should successfully refresh the access token", async () => {
    // Create new user
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
    });

    // Authenticate user
    const authResponse = await request(app.server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "12345678",
    });

    const cookies = authResponse.get("Set-Cookie");

    // Added this because TypeScript is complaining about cookies being possibly undefined
    if (!cookies) {
      throw new Error("No cookies found in the response");
    }

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ token: expect.any(String) });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
