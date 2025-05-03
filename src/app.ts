// External libraries
import fastify from "fastify";
// Internal utilities
import { routes } from "./http/routes";

export const app = fastify();

app.register(routes)
