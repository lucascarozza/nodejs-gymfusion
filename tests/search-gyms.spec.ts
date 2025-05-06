// External libraries
import { beforeEach, describe, expect, it } from "vitest";
// Internal utilities
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsService } from "@/services/search-gyms-service";

let mockGymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe("Search Gyms Service", () => {
  beforeEach(async () => {
    mockGymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(mockGymsRepository);
  });

  it("should return gyms matching the search query", async () => {
    await mockGymsRepository.create({
      name: "Fitness Spot Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    await mockGymsRepository.create({
      name: "Be Fitness Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    const { gyms } = await sut.searchGyms({
      query: "Spot",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Fitness Spot Gym" }),
    ]);
  });

  it("should return paginated gyms matching the search query", async () => {
    for (let i = 1; i <= 22; i++) {
      await mockGymsRepository.create({
        name: `Fitness Spot Gym ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      });
    }

    const { gyms } = await sut.searchGyms({
      query: "Spot",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Fitness Spot Gym 21" }),
      expect.objectContaining({ name: "Fitness Spot Gym 22" }),
    ]);
  });
});
