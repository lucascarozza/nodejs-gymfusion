// External libraries
import { beforeEach, describe, expect, it } from "vitest";
// Internal utilities
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInHistoryService } from "@/services/fetch-user-check-in-history-service";

let mockCheckInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInHistoryService;

describe("Fetch User Check-in History Service", () => {
  beforeEach(async () => {
    mockCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInHistoryService(mockCheckInsRepository);
  });

  it("should retrieve the user's check-in history successfully", async () => {
    await mockCheckInsRepository.create({
      gym_id: "gym-1",
      user_id: "user-1",
    });

    await mockCheckInsRepository.create({
      gym_id: "gym-2",
      user_id: "user-1",
    });

    await mockCheckInsRepository.create({
      gym_id: "gym-3",
      user_id: "user-2",
    });

    const { checkIns } = await sut.FetchUserCheckInHistory({
      userId: "user-1",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-1" }),
      expect.objectContaining({ gym_id: "gym-2" }),
    ]);
  });

  it("should allow fetching paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await mockCheckInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-1",
      });
    }

    const { checkIns } = await sut.FetchUserCheckInHistory({
      userId: "user-1",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
