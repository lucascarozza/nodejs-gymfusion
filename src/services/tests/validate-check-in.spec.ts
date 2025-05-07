// External libraries
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// Internal utilities
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInService } from "@/services/validate-check-in-service";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let mockCheckInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInService;

describe("Validate Check-In Service", () => {
  beforeEach(async () => {
    mockCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInService(mockCheckInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should allow check-in if all conditions are met", async () => {
    const createdCheckIn = await mockCheckInsRepository.create({
      gym_id: "1",
      user_id: "1",
    });

    const { checkIn } = await sut.validate({
      id: createdCheckIn.id,
    });

    expect(checkIn.validated).toEqual(expect.any(Date));
    expect(mockCheckInsRepository.memory[0].validated).toEqual(
      expect.any(Date)
    );
  });

  it("should reject validation for non-existent check-ins", async () => {
    await expect(() =>
      sut.validate({
        id: "inexistent",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should prevent validation after 20 minutes", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 13, 40));

    const createdCheckIn = await mockCheckInsRepository.create({
      gym_id: "1",
      user_id: "1",
    });

    vi.advanceTimersByTime(1000 * 60 * 21);

    await expect(() =>
      sut.validate({
        id: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
