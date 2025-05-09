// External libraries
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
// Internal utilities
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";

describe("Profile Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should successfully get user profile", async () => {
    const { token } = await createAndAuthenticateUser(app);

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
