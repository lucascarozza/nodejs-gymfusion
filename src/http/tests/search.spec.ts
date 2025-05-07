// External libraries
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
// Internal utilities
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Search Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return gyms matching the search query", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Example E2E Test Gym One",
        description: null,
        phone: null,
        latitude: -38.83246,
        longitude: -103.80138,
      });

    await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Example E2E Test Gym Two",
        description: null,
        phone: null,
        latitude: -38.83246,
        longitude: -103.80138,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({ query: "Two" })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ name: "Example E2E Test Gym Two" }),
    ]);
  });
});
