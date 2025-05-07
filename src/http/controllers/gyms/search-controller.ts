// External libraries
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
// Internal utilities
import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service";

export async function searchController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Zod Schema
  const searchGymsQuerySchema = z.object({
    query: z
      .string()
      .max(
        100,
        "Search term cannot exceed 100 characters. Please enter a shorter search term."
      ),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } =
    searchGymsQuerySchema.parse(request.query);

  const searchGymsService = makeSearchGymsService();

  const { gyms } = await searchGymsService.searchGyms({
    query,
    page,
  });

  return reply.status(200).send({ gyms });
}
