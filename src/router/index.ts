import { mergeRouters } from "../trpc";
import { userRouter } from "./userRouter";
import { phoneRouter } from "./phoneRouter";

export const appRouter = mergeRouters(userRouter, phoneRouter);
