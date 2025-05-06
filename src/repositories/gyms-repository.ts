import { Gym, Prisma } from "generated/prisma/client";

export interface searchManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  searchManyNearby(params: searchManyNearbyParams): Promise<Gym[]>;
}
