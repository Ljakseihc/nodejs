import express from 'express'
import { authRequestValidation } from '../../utils/validator'
import AuthController from '../auth-controller'

const authRouter = express.Router()

authRouter.post('/auth', authRequestValidation, AuthController.authUser)

export default authRouter
