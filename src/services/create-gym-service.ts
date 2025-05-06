// Internal utilities
import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "generated/prisma/client";

interface CreateGymRequest {
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymResponse {
  gym: Gym;
}

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async register({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymRequest): Promise<CreateGymResponse> {
    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
