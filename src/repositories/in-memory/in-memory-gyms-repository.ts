// Internal utilities
import { Gym } from "generated/prisma/client";
import { GymsRepository } from "../gyms-repository";

/*
 * Mock implementation of GymsRepository for unit testing with Vitest,  
 * emulating database interactions by storing gym records in memory.
 */
export class InMemoryGymsRepository implements GymsRepository {
  public memory: Gym[] = [];

  async findById(id: string) {
    const gym = this.memory.find((item) => item.id === id);

    if (!gym) return null;

    return gym;
  }
}
