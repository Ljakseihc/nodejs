import { Optional } from "sequelize"

export type UserId = string;

export interface UserInterface {
  id: UserId;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
  createdAt?: Date
}

export type UserInput = Optional<UserInterface, "id" | "isDeleted">
export type UserOutput = Required<UserInterface>
