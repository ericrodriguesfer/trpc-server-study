import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { database } from "../../database";
import { users } from "../../database/schema";

interface IUserCreateUseInput {
  name: string;
}

interface IUserCreateResponse {
  id: number;
  name: string | null;
}

class UserCreateUseCase {
  async exeute({ name }: IUserCreateUseInput): Promise<IUserCreateResponse[]> {
    const existsUserWithName = await database.query.users.findMany({
      where: eq(users.name, name),
    });

    if (existsUserWithName.length > 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Username in usage for other user.",
      });
    }

    return database.insert(users).values({ name: name }).returning();
  }
}

export const userCreateUseCase = new UserCreateUseCase();
