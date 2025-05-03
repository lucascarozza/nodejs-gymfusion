// External libraries
import { registerService } from "@/services/register-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

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
    await registerService({
      name,
      email,
      password,
    });
  } catch (err) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
