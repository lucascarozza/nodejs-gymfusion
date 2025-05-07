// External libraries
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
// Internal utilities
import { makeFetchUserCheckInHistoryService } from "@/services/factories/make-fetch-user-check-in-history-service";

export async function historyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Zod Schema
  const historyQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = historyQuerySchema.parse(request.query);

  const fetchUserCheckInHistoryService = makeFetchUserCheckInHistoryService();

  const { checkIns } =
    await fetchUserCheckInHistoryService.FetchUserCheckInHistory({
      userId: request.user.sub,
      page,
    });

  return reply.status(200).send({ checkIns });
}
