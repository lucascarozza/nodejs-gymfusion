// Internal utilities
import { app as server } from "./app";
import { env } from "./env";

server
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server Running.");
  });
