import { DataTypes, Model } from 'sequelize'
import sequelize from "../../config/sequlize"
import { GroupId, GroupInput, GroupInterface } from '../../model/group-model'
import { Permission } from '../../model/group-model'

class Group extends Model<GroupInterface, GroupInput> implements GroupInterface {
  id!: GroupId;
  name!: string;
  permissions!: Permission[];
  readonly createdAt!: Date;
  static associate(models: any) {
    Group.belongsToMany(models.User, {
      through: 'UserGroups',
    });
  }
}

Group.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: sequelize,
  modelName: 'Group',
})

export { Group }