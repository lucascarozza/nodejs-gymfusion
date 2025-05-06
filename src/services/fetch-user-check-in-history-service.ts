// Internal utilities
import { CheckIn } from "generated/prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInHistoryServiceRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInHistoryServiceResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInHistoryService {
  constructor(private checkInsRespository: CheckInsRepository) {}

  async FetchUserCheckInHistory({
    userId,
    page,
  }: FetchUserCheckInHistoryServiceRequest): Promise<FetchUserCheckInHistoryServiceResponse> {
    const checkIns = await this.checkInsRespository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
