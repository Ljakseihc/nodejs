import sequelize from "../../config/sequlize"
import { UserGroup } from '../tables/userGroup-tables'
import { UserGroupRequestBodyType } from "../../model/userGroup-model"

class UserGroupRepository {

    public async addUsersToGroup({ groupId, userIds }: UserGroupRequestBodyType) {
        console.log("11111111111111111")
        const transaction = await sequelize.transaction()
        console.log("22222222222222222")
        try {
            for (const id of userIds) {
                console.log(id)
                await UserGroup.create({
                    GroupId: groupId,
                    UserId: id,
                }, { transaction })
            }
            await transaction.commit()
        } catch (error) {
            console.log(error)
            await transaction.rollback()
        }
    }
}

export const userGroupRepository = new UserGroupRepository()
