// External libraries
import { beforeEach, describe, expect, it } from "vitest";
// Internal utilities
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchNearbyGymsService } from "@/services/search-nearby-gyms-service";

let mockGymsRepository: InMemoryGymsRepository;
let sut: SearchNearbyGymsService;

describe("Search Nearby Gyms Service", () => {
  beforeEach(async () => {
    mockGymsRepository = new InMemoryGymsRepository();
    sut = new SearchNearbyGymsService(mockGymsRepository);
  });

  it("should return nearby gyms", async () => {
    await mockGymsRepository.create({
      name: "Gym 1",
      description: null,
      phone: null,
      latitude: 22.92882,
      longitude: -8.73116,
    });

    await mockGymsRepository.create({
      name: "Nearby Gym 1",
      description: null,
      phone: null,
      latitude: -38.83246,
      longitude: -103.80138,
    });

    const { gyms } = await sut.searchNearbyGyms({
      userLatitude: -38.83246,
      userLongitude: -103.80138,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Nearby Gym 1" })]);
  });
});
