// External libraries
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
// Internal utilities
import { makeCreateGymService } from "@/services/factories/make-create-gym-service";

export async function createController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Zod Schema
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { name, description, phone, latitude, longitude } =
    createBodySchema.parse(request.body);

  const createGymService = makeCreateGymService();

  await createGymService.createGym({
    name,
    description,
    phone,
    latitude,
    longitude,
  });

  return reply.status(201).send();
}
