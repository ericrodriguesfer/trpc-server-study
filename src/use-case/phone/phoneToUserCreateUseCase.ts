import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { database } from "../../database";
import { phone, users } from "../../database/schema";

interface IPhoneToUserCreateInput {
  userId: number;
  operator: string;
  ddd: string;
  number: string;
}

interface IPhoneToUserCreateResponse {
  id: number;
  userId: number | null;
  operator: string | null;
  ddd: string | null;
  number: string | null;
}

class PhoneToUserCreateUseCase {
  async execute({
    userId,
    operator,
    ddd,
    number,
  }: IPhoneToUserCreateInput): Promise<IPhoneToUserCreateResponse[]> {
    const existsUser = await database.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!existsUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User to link with phone not found.",
      });
    }

    const existsPhoneNumber = await database.query.phone.findMany({
      where: eq(phone.userId, userId),
    });

    if (existsPhoneNumber.length > 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User have phone number.",
      });
    }

    return await database
      .insert(phone)
      .values({
        ddd: ddd,
        operator: operator,
        number: number,
        userId: userId,
      })
      .returning();
  }
}

export const phoneToUserCreateUseCase = new PhoneToUserCreateUseCase();
