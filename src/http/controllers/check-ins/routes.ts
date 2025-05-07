// External libraries
import { FastifyInstance } from "fastify";
// Internal utilities
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createController } from "./create-controller";
import { validateController } from "./validate-controller";
import { historyController } from "./history-controller";
import { metricsController } from "./metrics-controller";

export async function checkInRoutes(app: FastifyInstance) {
  // Authenticated routes
  app.addHook("onRequest", verifyJWT);
  // POST routes
  app.post("/gyms/:gymId/check-in", createController);
  // GET routes
  app.get("/check-in/history", historyController);
  app.get("/check-in/metrics", metricsController);
  // PATCH routes
  app.patch("/check-in/:checkInId/validate", validateController);
}
