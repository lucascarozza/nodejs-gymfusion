// External libraries
import { beforeEach, describe, expect, it } from "vitest";
// Internal utilities
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsService } from "@/services/get-user-metrics-service";

let mockCheckInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsService;

describe("Get User Metrics Service", () => {
  beforeEach(async () => {
    mockCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(mockCheckInsRepository);
  });

  it("should return the total number of user check-ins", async () => {
    await mockCheckInsRepository.create({
      gym_id: "gym-1",
      user_id: "user-1",
    });

    await mockCheckInsRepository.create({
      gym_id: "gym-2",
      user_id: "user-1",
    });

    const { checkInsCount } = await sut.GetUserMetrics({
      userId: "user-1",
    });

    expect(checkInsCount).toEqual(2);
  });
});
