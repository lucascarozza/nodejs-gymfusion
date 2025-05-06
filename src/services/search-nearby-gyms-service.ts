// Internal utilities
import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "generated/prisma/client";

interface SearchNearbyGymsServiceRequest {
  userLatitude: number;
  userLongitude: number;
}

interface SearchNearbyGymsServiceResponse {
  gyms: Gym[];
}

export class SearchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async searchNearbyGyms({
    userLatitude,
    userLongitude,
  }: SearchNearbyGymsServiceRequest): Promise<SearchNearbyGymsServiceResponse> {
    const gyms = await this.gymsRepository.searchManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
