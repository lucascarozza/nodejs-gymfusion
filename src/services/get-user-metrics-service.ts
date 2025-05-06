// Internal utilities
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsServiceRequest {
  userId: string;
}

interface GetUserMetricsServiceResponse {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkInsRespository: CheckInsRepository) {}

  async GetUserMetrics({
    userId,
  }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
    const checkInsCount = await this.checkInsRespository.countByUserId(userId);

    return { checkInsCount };
  }
}
