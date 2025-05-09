// External libraries
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ZodError } from "zod";
// Internal utilities
import { env } from "./env";
import { usersRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkInRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();

// Register fastify-jwt for JWT authentication
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

// Register fastify-cookie to handle cookies
app.register(fastifyCookie);

// Register routes
app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInRoutes);

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
