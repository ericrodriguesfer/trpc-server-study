import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { database } from "../../database";
import { users } from "../../database/schema";

interface IUserUpdateInput {
  userId: number;
  name: string;
}

interface IUserUpdateResponse {
  id: number;
  name: string | null;
}

class UserUpdateUseCase {
  async execute({
    userId,
    name,
  }: IUserUpdateInput): Promise<IUserUpdateResponse[]> {
    const existsUser = await database.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!existsUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User to update not found.",
      });
    }

    return await database
      .update(users)
      .set({ name: name })
      .where(eq(users.id, userId))
      .returning();
  }
}

export const userUpdateUseCase = new UserUpdateUseCase();
