// External libraries
import { FastifyInstance } from "fastify";
// Internal utilities
import { registerController } from "./controllers/register-controller";
import { authenticateController } from "./controllers/authenticate-controller";

export async function routes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
}
