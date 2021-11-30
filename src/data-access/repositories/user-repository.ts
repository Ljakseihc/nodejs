import { UserInput, UserOutput, UserId } from "../../model/user-model"
import { User } from "../tables/user-table"

class UsersRepository {
  
    async getUserList(): Promise<UserOutput[]> {
      return User.findAll({
        where: { isDeleted: false },
      });
    }
  
    async getUserById(id: UserId): Promise<UserOutput | undefined> {
      try {
        const user = await User.findByPk(id);
        if (user) {
          return user;
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    async deleteUser(id: UserId): Promise<string | undefined> {
      try {
        await User.update({ isDeleted: true }, { where: { id } })
        return id;
      } catch (error) {
        console.log(error);
      }
    }

    async addUser(userData: UserInput): Promise<User | undefined> {
        try {
          return User.create({ ...userData })
        } catch (error) {
          console.log(error);
        }
      }
  
    async updateUser(id: UserId, userData: UserInput): Promise<User | undefined> {
      try {
        const user = await User.findByPk(id)
        if (user) {
          await user.update({ ...userData })
          return user
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    async isLoginExist(login: string): Promise<boolean | undefined> {
      try {
        const user = await User.findOne({
          where: { login },
        })
        return !!user
      } catch (error) {
        console.log(error)
      }
    }   
  }
  
  export const usersRepository = new UsersRepository()
