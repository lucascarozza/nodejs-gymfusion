// External libraries
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
// Internal utilities
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "@/services/register-service";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Zod Schema
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(
        20,
        "Password cannot exceed 20 characters. Please enter a shorter password."
      ),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(usersRepository);

    await registerService.register({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error
  }

  return reply.status(201).send();
}
