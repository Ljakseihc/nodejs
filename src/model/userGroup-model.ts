import { GroupId } from "./group-model";
import { UserId } from "./user-model";

export interface UserGroupInterface {
    id: number;
    GroupId: string;
    UserId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserGroupRequestBodyType = {
    groupId: UserId;
    userIds: GroupId[];
}
