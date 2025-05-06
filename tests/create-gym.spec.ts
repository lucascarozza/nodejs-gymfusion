// External libraries
import { beforeEach, describe, expect, it } from "vitest";
// Internal utilities
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "@/services/create-gym-service";

let mockRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe("Create Gym Service", () => {
  beforeEach(() => {
    mockRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(mockRepository);
  });

  it("should successfully create a new gym", async () => {
    const { gym } = await sut.createGym({
      name: "Gym",
      description: "Gym description",
      phone: null,
      latitude: -38.83246,
      longitude: -103.80138,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
