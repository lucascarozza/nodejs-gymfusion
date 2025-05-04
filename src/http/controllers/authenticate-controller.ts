// External libraries
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
// Internal utilities
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Zod Schema
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(
        20,
        "Password cannot exceed 20 characters. Please enter a shorter password."
      ),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();

    await authenticateService.authenticate({
      email,
      password,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error
  }

  return reply.status(200).send();
}
