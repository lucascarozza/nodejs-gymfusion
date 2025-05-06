// Internal utilities
import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "generated/prisma/client";

interface SearchGymsServiceRequest {
  query: string;
  page: number;
}

interface SearchGymsServiceResponse {
  gyms: Gym[];
}

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async searchGyms({
    query,
    page,
  }: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
