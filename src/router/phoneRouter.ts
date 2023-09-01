import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { phoneToUserCreateUseCase } from "../use-case/phone";

export const phoneRouter = router({
  phoneToUserCreate: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        operator: z.string(),
        ddd: z.string(),
        number: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await phoneToUserCreateUseCase.execute({ ...input });
    }),
});

export type PhoneRouter = typeof phoneRouter;
