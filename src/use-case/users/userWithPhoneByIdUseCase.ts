import { eq } from "drizzle-orm";

import { database } from "../../database";
import { users } from "../../database/schema";

interface IUserWithPhoneByIdResponse {
  id: number;
  name: string | null;
  phone: {
    id: number;
    userId: number | null;
    operator: string | null;
    ddd: string | null;
    number: string | null;
  };
}

class UserWithPhoneByIdUseCase {
  async exeute(input: number): Promise<IUserWithPhoneByIdResponse | undefined> {
    return await database.query.users.findFirst({
      where: eq(users.id, input),
      with: { phone: true },
    });
  }
}

export const userWithPhoneByIdUseCase = new UserWithPhoneByIdUseCase();
