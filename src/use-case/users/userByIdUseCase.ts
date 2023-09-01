import { eq } from "drizzle-orm";

import { database } from "../../database";
import { users } from "../../database/schema";

interface IUserByIdResponse {
  id: number;
  name: string | null;
}

class UserByIdUseCase {
  async execute(input: number): Promise<IUserByIdResponse | undefined> {
    return await database.query.users.findFirst({ where: eq(users.id, input) });
  }
}

export const userByIdUseCase = new UserByIdUseCase();
