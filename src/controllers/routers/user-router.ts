import express from 'express'
import UserController from '../user-controller'
import { validator, schema } from '../../utils/validator'

const userRouter = express.Router()

userRouter.get('/user', UserController.getUserList)
userRouter.get('/user/:id', UserController.getUserById)
userRouter.post('/user', validator.body(schema), UserController.addUser)
userRouter.put('/user/:id', validator.body(schema), UserController.updateUser)
userRouter.delete('/user/:id', UserController.deleteUser)

export default userRouter
