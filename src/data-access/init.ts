import sequelize from '../config/sequlize'
import { User } from "./tables/user-table"
import { Group } from './tables/group-table'
import { users } from './seeders/user-seeder'
import { groups } from './seeders/group-seeder'
import { UsersService } from '../services/user-service'
import { GroupsService } from '../services/group-service'
import { UserGroup } from './tables/userGroup-tables'

const usersService = new UsersService(User)
const groupsService = new GroupsService(Group)

export const initDb = async () => sequelize.sync()


export const initDataBase = () => {
    
    const init = Promise.all([
        User.sync({ alter: true }), 
        Group.sync({ alter: true }), 
        UserGroup.sync({ alter: true })
    ])

    return init
} 

export const createEntities = async () => {
    users.forEach(user => {
        usersService.addUser(user)
    })
    groups.forEach(group => {
        groupsService.addGroup(group)
    })
}
