// External libraries
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
// Internal utilities
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create Check-in Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should successfully create a new check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        name: "Example E2E Test Gym",
        latitude: -38.83246,
        longitude: -103.80138,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-in`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -38.83246,
        longitude: -103.80138,
      });

    expect(response.statusCode).toEqual(201);
  });
});
