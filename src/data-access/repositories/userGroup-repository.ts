import sequelize from "../../config/sequlize"
import { UserGroup } from '../tables/userGroup-tables'
import { UserGroupRequestBodyType } from "../../model/userGroup-model"
import logger from "../../logger/logger"

class UserGroupRepository {

    public async addUsersToGroup({ groupId, userIds }: UserGroupRequestBodyType) {
        const transaction = await sequelize.transaction()
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
            logger.error(error)
            await transaction.rollback()
            throw error
        }
    }
}

export const userGroupRepository = new UserGroupRepository()
