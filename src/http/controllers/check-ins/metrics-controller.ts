// External libraries
import { FastifyReply, FastifyRequest } from "fastify";
// Internal utilities
import { makeGetUserMetricsService } from "@/services/factories/make-get-user-metrics-service";

export async function metricsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserMetricsService = makeGetUserMetricsService();

  const { checkInsCount } = await getUserMetricsService.GetUserMetrics({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}
