// External libraries
import dayjs from "dayjs";
// Internal utilities
import { CheckIn } from "generated/prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

interface ValidateCheckInServiceRequest {
  id: string;
}

interface ValidateCheckInServiceResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInService {
  constructor(private checkInsRespository: CheckInsRepository) {}

  async validate({
    id,
  }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkInsRespository.findById(id);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated = new Date();

    await this.checkInsRespository.save(checkIn);

    return { checkIn };
  }
}
