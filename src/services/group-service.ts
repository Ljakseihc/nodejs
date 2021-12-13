import { GroupInput, GroupOutput, GroupId } from "../model/group-model"
import { groupRepository } from "../data-access/repositories/group-repository"
import { userGroupRepository } from "../data-access/repositories/userGroup-repository"
import { UserGroupRequestBodyType } from "../model/userGroup-model"

export class GroupsService {
    private groupModel

    constructor(groupModel: any) {
        this.groupModel = groupModel
    }

    async addGroup(groupInput: GroupInput): Promise<GroupOutput | undefined> {
        const isGroupExist = await groupRepository.isGroupExist(groupInput.name)
        if (!isGroupExist) {
            const newGroup = await groupRepository.createGroup(groupInput)
            if (newGroup) {
                return newGroup
            }
        }
    }

    async getGroupById(groupId: GroupId): Promise<GroupOutput | undefined> {
        const group = await groupRepository.getGroupById(groupId)
        if (group) {
            return group
        }
    }

    async getGroupList(): Promise<GroupOutput[]> {
        return await groupRepository.getAllGroup()
    }

    async deleteGroup(groupId: GroupId): Promise<GroupId | undefined> {
        const isRemoved = await groupRepository.removeGroup(groupId)
        if (isRemoved) {
            return groupId
        }
    }

    async updateGroup(groupId: GroupId, groupInput: GroupInput): Promise<GroupOutput | undefined> {
        const updatedGroup = await groupRepository.updateGroup(groupId, groupInput)
        if (updatedGroup) {
            return updatedGroup
        }
    }

    async addUsersToGroup(body: UserGroupRequestBodyType) : Promise<void> {
        return userGroupRepository.addUsersToGroup(body)
    }
}
