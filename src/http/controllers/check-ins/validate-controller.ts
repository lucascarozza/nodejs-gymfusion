// External libraries
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
// Internal utilities
import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in-service";

export async function validateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Zod Schema
  const validateParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateParamsSchema.parse(request.params);

  const validateCheckInService = makeValidateCheckInService();

  await validateCheckInService.validate({
    id: checkInId,
  });

  return reply.status(204).send();
}
