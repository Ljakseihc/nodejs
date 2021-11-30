import { UserId, UserInput, UserOutput } from "../model/user-model"
import { usersRepository } from "../data-access/repositories/user-repository"

export class UsersService {

  private userModel

  constructor(userModel: any) {
    this.userModel = userModel
  }

  async addUser(userData: UserInput): Promise<UserOutput| undefined> {
    const isLoginExist = await usersRepository.isLoginExist(userData.login)
    if (!isLoginExist) {
      const newUser = await usersRepository.addUser(userData)
      if (newUser) {
        return newUser
      }
    }
  }

  async getUserById(userId: UserId): Promise<UserOutput| undefined> {
    const user = await usersRepository.getUserById(userId)
    if (user) {
      return user
    }
  }

  async getUserList(): Promise<UserOutput[]> {
    return await usersRepository.getUserList()
  }

  async deleteUser(userId: UserId): Promise<UserId| undefined> {
    const isRemoved = await usersRepository.deleteUser(userId)
    if (isRemoved) {
      return userId
    }
  }

  async updateUser(userId: UserId, userData: UserInput): Promise<UserOutput| undefined> {
    const updatedUser = await usersRepository.updateUser(userId, userData)
    if (updatedUser) {
      return updatedUser
    }
  }
}
