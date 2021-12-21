import { GroupOutput, GroupInput, GroupId } from '../../model/group-model'
import { Group } from '../tables/group-table'

class GroupRepository {

    async getAllGroup(): Promise<GroupOutput[]> {
        return Group.findAll()
    }

    async getGroupById(id: GroupId): Promise<GroupOutput | undefined> {
        const group = await Group.findByPk(id)
        if (group) {
            return group
        }
    }

    async removeGroup(id: GroupId): Promise<boolean | undefined> {
        const destroyCount = await Group.destroy({ where: { id }, force: true })
        return !!destroyCount
    }

    async updateGroup(id: GroupId, groupInput: GroupInput): Promise<Group | undefined> {
        const group = await Group.findByPk(id)
        if (group) {
            await group.update({ ...groupInput })
            return group
        }
    }

    async isGroupExist(name: string): Promise<boolean | undefined> {
        const group = await Group.findOne({
            where: { name },
        })

        return !!group
    }

    async createGroup(groupInput: GroupInput): Promise<Group | undefined> {
        return Group.create({ ...groupInput })
    }
}

export const groupRepository = new GroupRepository()
