import express from 'express'
import UserController from '../controllers/user-controller'
import { validator, schema } from '../utils/validator'

const router = express.Router()

router.get('/user', UserController.getUserList)
router.get('/user/:id', UserController.getUserById)
router.post('/user', validator.body(schema), UserController.addUser)
router.put('/user/:id', validator.body(schema), UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)

export default router