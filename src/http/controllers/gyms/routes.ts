// External libraries
import { FastifyInstance } from "fastify";
// Internal utilities
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { searchController } from "./search-controller";
import { searchNearbyController } from "./search-nearby-controller";
import { createController } from "./create-controller";

export async function gymsRoutes(app: FastifyInstance) {
  // Authenticated routes
  app.addHook("onRequest", verifyJWT);

  // POST routes
  app.post("/gyms/create", createController);
  // GET routes
  app.get("/gyms/search", searchController);
  app.get("/gyms/nearby", searchNearbyController);
}
