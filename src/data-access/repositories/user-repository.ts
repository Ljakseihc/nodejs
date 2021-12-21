import { UserInput, UserOutput, UserId } from "../../model/user-model"
import { User } from "../tables/user-table"

class UsersRepository {

  async getUserList(): Promise<UserOutput[]> {
    return User.findAll({
      where: { isDeleted: false },
    });
  }

  async getUserById(id: UserId): Promise<UserOutput | undefined> {
    const user = await User.findByPk(id);
    if (user) {
      return user;
    }
  }

  async deleteUser(id: UserId): Promise<string | undefined> {
    const user = await User.update({ isDeleted: true }, { where: { id } })
    if (user) {
      return id;
    }
  }

  async addUser(userData: UserInput): Promise<User | undefined> {
    return User.create({ ...userData })
  }

  async updateUser(id: UserId, userData: UserInput): Promise<User | undefined> {
    const user = await User.findByPk(id)
    if (user) {
      await user.update({ ...userData })
      return user
    }
  }

  async isLoginExist(login: string): Promise<boolean | undefined> {
    const user = await User.findOne({
      where: { login },
    })
    return !!user
  }
}

export const usersRepository = new UsersRepository()
