import { Optional } from "sequelize"

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'

export type GroupId = string;

export interface GroupInterface {
    id: GroupId;
    name: string;
    permissions: Permission[];
    createdAt?: Date;
}

export type GroupInput = Optional<GroupInterface, "id">
export type GroupOutput = Required<GroupInterface>
