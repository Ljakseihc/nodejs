import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import { BadRequestError } from '../logger/error';
import { NextFunction, Request, Response } from 'express';

export const validator = createValidator();

const userSchema = Joi.object({
    login: Joi.string().min(2).max(20).required(),
    password: Joi.string().alphanum().min(5).max(20).required(),
    age: Joi.number().integer().min(4).max(130).required(),
});

export const userRequestValidation = async ( req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body, { allowUnknown: false });
  if (error?.isJoi) {
    const message = error.details[0].message
    next(new BadRequestError(message))
  } else {
    next()
  }
}

const userGroupSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
  userIds: Joi.array().items(Joi.string().uuid().required()),
})

export const groupRequestValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = userGroupSchema.validate(req.body, { allowUnknown: false })
  if (error?.isJoi) {
    const message = error.details[0].message
    next(new BadRequestError(message))
  } else {
    next()
  }
}

const idSchema = Joi.string().uuid().required()

export const requestIdValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = idSchema.validate(req.params.id);
  if (error?.isJoi) {
    const message = error.details[0].message;
    next(new BadRequestError(message));
  } else {
    next();
  }
};

const authPostSchema = Joi.object({
  login: Joi.string().min(2).max(20).required(),
  password: Joi.string().alphanum().min(5).max(20).required()
})

export const authRequestValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = authPostSchema.validate(req.body, { allowUnknown: false })
  if (error?.isJoi) {
    const message = error.details[0].message
    next(new BadRequestError(message))
  } else {
    next()
  }
}
