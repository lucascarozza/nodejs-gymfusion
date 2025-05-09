// External libraries
import { FastifyInstance } from "fastify";
// Internal utilities
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { searchController } from "./search-controller";
import { searchNearbyController } from "./search-nearby-controller";
import { createController } from "./create-controller";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
  // Authenticated routes
  app.addHook("onRequest", verifyJWT);

  // POST routes
  app.post("/gyms/create", { onRequest: [verifyUserRole("ADMIN")] }, createController); // Admin only
  // GET routes
  app.get("/gyms/search", searchController);
  app.get("/gyms/nearby", searchNearbyController);
}
