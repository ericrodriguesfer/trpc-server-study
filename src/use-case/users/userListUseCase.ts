import { database } from "../../database";

interface IUserListResponse {
  id: number;
  name: string | null;
}

class UserListUseCase {
  async exeute(): Promise<IUserListResponse[]> {
    return await database.query.users.findMany();
  }
}

export const userListUseCase = new UserListUseCase();
