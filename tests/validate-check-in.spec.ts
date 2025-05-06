// External libraries
import { beforeEach, describe, expect, it } from "vitest";
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

    // vi.useFakeTimers();
  });

  // afterEach(() => {
  //   vi.useRealTimers();
  // });

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
});
