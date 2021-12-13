import { DataTypes, Model, Optional } from 'sequelize';

import sequelize from "../../config/sequlize"
import { UserGroupInterface } from '../../model/userGroup-model';

type UserGroupCreationAttributes = Optional<UserGroupInterface, 'id'>

class UserGroup extends Model<UserGroupInterface, UserGroupCreationAttributes> implements UserGroupInterface {
  public id!: number;
  public GroupId!: string;
  public UserId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserGroup.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  GroupId: {
    type: DataTypes.UUIDV4,
    references: {
      model: 'Groups',
      key: 'id',
    },
  },
  UserId: {
    type: DataTypes.UUIDV4,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  sequelize: sequelize,
  modelName: 'UserGroup',
})

export { UserGroup }
