import express from 'express'
import UserController from '../user-controller'
import { requestIdValidation, userRequestValidation } from '../../utils/validator'

const userRouter = express.Router()

userRouter.get('/user', UserController.getUserList)
userRouter.get('/user/:id', requestIdValidation, UserController.getUserById)
userRouter.post('/user', userRequestValidation, UserController.addUser)
userRouter.put('/user/:id', requestIdValidation, UserController.updateUser)
userRouter.delete('/user/:id', requestIdValidation, UserController.deleteUser)

export default userRouter
