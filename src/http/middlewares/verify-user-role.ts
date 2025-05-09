// External libraries
import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(verifyFor: "ADMIN" | "USER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== verifyFor) {
      return reply.status(403).send({ message: "Unauthorized." });
    }
  };
}
