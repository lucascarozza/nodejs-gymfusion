// External libraries
import fastify from "fastify";
import { ZodError } from "zod";
// Internal utilities
import { routes } from "./http/routes";
import { env } from "./env";

export const app = fastify();

app.register(routes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
  // todo: log errors to external tool
  }

  return reply.status(500).send({ message: "Internal server error." });
});
