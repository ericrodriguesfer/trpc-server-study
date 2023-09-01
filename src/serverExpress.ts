import * as trpcExpress from "@trpc/server/adapters/express";
import express, { Application } from "express";

import { appRouter } from "./router";
import { createContext } from "./trpc";
import { env } from "./config/env";

const app: Application = express();

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({ router: appRouter, createContext })
);

app.listen(Number(env.PORT_EXPRESS), () =>
  console.log("Running tRPC with express...")
);
