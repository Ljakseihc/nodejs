import Sequelize, { DataTypes, Model } from "sequelize"
import { UserInterface, UserId, UserInput } from "../../model/user-model"
import { Group } from "./group-table";
import { GroupId } from '../../model/group-model'
import sequelize from "../../config/sequlize"

class User extends Model<UserInterface, UserInput> implements UserInterface {
  id!: UserId;
  login!: string;
  password!: string;
  age!: number;
  isDeleted!: boolean;
  createdAt!: Date
  static associate(models: any) {
    User.belongsToMany(models.Group, {
      through: 'UserGroups',
    })
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE
    }
  },
  {
    timestamps: true,
    sequelize: sequelize,
  }
)

export { User }
