import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { omit } from "lodash";

import { env } from "../config/env";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return {
      ...shape,
      data: {
        ...omit(
          shape.data,
          env?.NODE_ENV && env?.NODE_ENV === "development" ? [] : ["stack"]
        ),
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;
