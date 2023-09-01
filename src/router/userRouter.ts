import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import {
  userListUseCase,
  usersListWithPhoneUseCase,
  userByIdUseCase,
  userWithPhoneByIdUseCase,
  userCreateUseCase,
  userUpdateUseCase,
  userDeleteUseCase,
} from "../use-case/users";

export const userRouter = router({
  userList: publicProcedure.query(async () => {
    return await userListUseCase.exeute();
  }),

  usersListWithPhone: publicProcedure.query(async () => {
    return await usersListWithPhoneUseCase.execute();
  }),

  userById: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await userByIdUseCase.execute(input);
  }),

  userWithPhoneById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await userWithPhoneByIdUseCase.exeute(input);
    }),

  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return await userCreateUseCase.exeute({ ...input });
    }),

  userUpdate: publicProcedure
    .input(z.object({ userId: z.number(), name: z.string() }))
    .mutation(async ({ input }) => {
      return await userUpdateUseCase.execute({ ...input });
    }),

  userDelete: publicProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ input }) => {
      return await userDeleteUseCase.execute({ ...input });
    }),
});

export type UserRouter = typeof userRouter;
