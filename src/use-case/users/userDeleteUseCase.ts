import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { database } from "../../database";
import { users } from "../../database/schema";

interface IUserDeleteInput {
  userId: number;
}

interface IUserDeleteResponse {
  id: number;
  name: string | null;
}

class UserDeleteUseCase {
  async execute({ userId }: IUserDeleteInput): Promise<IUserDeleteResponse[]> {
    const existsUser = await database.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!existsUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User to delete not found.",
      });
    }

    return await database.delete(users).where(eq(users.id, userId)).returning();
  }
}

export const userDeleteUseCase = new UserDeleteUseCase();
