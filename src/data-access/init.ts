import sequelize from '../config/sequlize'
import { User } from "./tables/user-table"
import { users } from './seeders/user-seeder'
import { UsersService } from '../services/user-service'

const usersService = new UsersService(User)

export const initDb = async () => sequelize.sync()

export const initDataBase = () => Promise.all([User.sync({ alter: true })])

export const createEntities = async () => {
    users.forEach(user => {
        usersService.addUser(user)
    })
}
