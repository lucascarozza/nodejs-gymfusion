// External libraries
import { FastifyInstance } from "fastify";
// Internak utilities
import { registerController } from "./controllers/register-controller";

export async function routes(app: FastifyInstance) {
  app.post("/users", registerController);
}
