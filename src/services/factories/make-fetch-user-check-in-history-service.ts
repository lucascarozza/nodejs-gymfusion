// Internal utilities
import { FetchUserCheckInHistoryService } from "../fetch-user-check-in-history-service";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFetchUserCheckInHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new FetchUserCheckInHistoryService(checkInsRepository);

  return service;
}