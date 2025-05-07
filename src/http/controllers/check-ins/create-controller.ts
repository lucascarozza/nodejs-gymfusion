// External libraries
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
// Internal utilities
import { makeCheckInService } from "@/services/factories/make-check-in-service";

export async function createController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Zod Schema
  const createParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  // Zod Schema
  const createBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createParamsSchema.parse(request.params);
  const { latitude, longitude } = createBodySchema.parse(request.body);

  const checkInService = makeCheckInService();

  await checkInService.checkIn({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}
