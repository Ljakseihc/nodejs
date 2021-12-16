import { GroupOutput, GroupInput, GroupId } from '../../model/group-model'
import { Group } from '../tables/group-table'

class GroupRepository {

    async getAllGroup(): Promise<GroupOutput[]> {
        return Group.findAll()
    }

    async getGroupById(id: GroupId): Promise<GroupOutput | undefined> {
        try {
            const group = await Group.findByPk(id)
            if (group) {
                return group
            }
        } catch (error) {
            console.log(error)
        }
    }

    async removeGroup(id: GroupId): Promise<boolean | undefined> {
        try {
            const destroyCount = await Group.destroy({ where: { id }, force: true })
            return !!destroyCount
        } catch (error) {
            console.log(error)
        }
    }

    async updateGroup(id: GroupId, groupInput: GroupInput): Promise<Group | undefined> {
        try {
            const group = await Group.findByPk(id)
            if (group) {
                await group.update({ ...groupInput })
                return group
            }
        } catch (error) {
            console.log(error)
        }
    }

    async isGroupExist(name: string): Promise<boolean | undefined> {
        try {
            const group = await Group.findOne({
                where: { name },
            })

            return !!group
        } catch (error) {
            console.log(error)
        }
    }

    async createGroup(groupInput: GroupInput): Promise<Group | undefined> {
        try {
            const group = Group.create({ ...groupInput })
            return group
        } catch (error) {
            console.log(error)
        }
    }
}

export const groupRepository = new GroupRepository()
