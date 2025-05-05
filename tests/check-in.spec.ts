// External libraries
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";
// Internal utilities
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "@/services/check-in-service";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let mockCheckInsRepository: InMemoryCheckInsRepository;
let mockGymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe("Check-In Service", () => {
  beforeEach(() => {
    mockCheckInsRepository = new InMemoryCheckInsRepository();
    mockGymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(mockCheckInsRepository, mockGymsRepository);

    mockGymsRepository.memory.push({
      id: "1",
      name: "Gym",
      description: null,
      phone: null,
      latitude: new Decimal(-38.83246),
      longitude: new Decimal(-103.80138),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should successfully check-in", async () => {
    const { checkIn } = await sut.authenticate({
      gymId: "1",
      userId: "2",
      userLatitude: -38.83246,
      userLongitude: -103.80138,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should prevent multiple check-ins on the same day", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.authenticate({
      gymId: "1",
      userId: "2",
      userLatitude: -38.83246,
      userLongitude: -103.80138,
    });

    await expect(() =>
      sut.authenticate({
        gymId: "1",
        userId: "2",
        userLatitude: -38.83246,
        userLongitude: -103.80138,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should allow check-ins on different days", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.authenticate({
      gymId: "1",
      userId: "2",
      userLatitude: -38.83246,
      userLongitude: -103.80138,
    });

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.authenticate({
      gymId: "1",
      userId: "2",
      userLatitude: -38.83246,
      userLongitude: -103.80138,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should restrict check-ins at distant gyms", async () => {
    await expect(() =>
      sut.authenticate({
        gymId: "1",
        userId: "2",
        userLatitude: 22.92882,
        userLongitude: -8.73116,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
