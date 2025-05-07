// External libraries
import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";
// Internal utilities

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserProfile = makeGetUserProfileService();

  const { user } = await getUserProfile.getUserProfile({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
