// Internal utilities
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchNearbyGymsService } from "../search-nearby-gyms-service";

export function makeSearchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const service = new SearchNearbyGymsService(gymsRepository);

  return service;
}