// External libraries
import { FastifyInstance } from "fastify";
// Internal utilities
import { registerController } from "./register-controller";
import { authenticateController } from "./authenticate-controller";
import { profileController } from "./profile-controller";
import { verifyJWT } from "../../middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
  // POST routes
  app.post("/users", registerController); // No auth
  app.post("/sessions", authenticateController); // No auth
  // GET routes
  app.get("/profile", { onRequest: [verifyJWT] }, profileController); // Requires auth
}
