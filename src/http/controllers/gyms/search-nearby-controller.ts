// External libraries
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
// Internal utilities
import { makeSearchNearbyGymsService } from "@/services/factories/make-search-nearby-gyms-service";

export async function searchNearbyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Zod Schema
  const searchNearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = searchNearbyGymsQuerySchema.parse(
    request.query
  );

  const searchNearbyGymsService = makeSearchNearbyGymsService();

  const { gyms } = await searchNearbyGymsService.searchNearbyGyms({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
}
