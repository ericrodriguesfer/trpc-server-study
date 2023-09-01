import { database } from "../../database";

interface IUserListWithPhoneResponse {
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

class UsersListWithPhoneUseCase {
  async execute(): Promise<IUserListWithPhoneResponse[]> {
    return await database.query.users.findMany({ with: { phone: true } });
  }
}

export const usersListWithPhoneUseCase = new UsersListWithPhoneUseCase();
