// External libraries
import { randomUUID } from "node:crypto";
// Internal utilities
import { Gym, Prisma } from "generated/prisma/client";
import { GymsRepository, searchManyNearbyParams } from "../gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

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

  async searchMany(query: string, page: number) {
    return this.memory
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async searchManyNearby(params: searchManyNearbyParams) {
    return this.memory.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      );

      return distance < 10; // In km.
    });
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.memory.push(gym);
    return gym;
  }
}
