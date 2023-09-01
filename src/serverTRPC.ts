import { createHTTPServer } from "@trpc/server/adapters/standalone";

import { appRouter } from "./router";
import { env } from "./config/env";

const server = createHTTPServer({ router: appRouter });

server.listen(Number(env.PORT_TRPC));
console.log("Running pure tRPC...");
