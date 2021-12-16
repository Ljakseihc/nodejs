import Joi from 'joi';
import { createValidator, ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const validator = createValidator();

export const schema = Joi.object({
    login: Joi.string().min(10).max(20).required(),
    password: Joi.string().alphanum().min(5).max(12).required(),
    age: Joi.number().integer().min(4).max(130).required(),
});

export interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        login: string;
        password: string;
        age: number;
    }
}

export const userGroupSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
  userIds: Joi.array().items(Joi.string().uuid().required()),
})

export interface UserGroupRequestBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    groupId: string;
    userIds: string[];
  },
}
