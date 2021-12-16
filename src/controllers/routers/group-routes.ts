import express from 'express'
import GroupController from '../group-controller'
import { validator, userGroupSchema } from '../../utils/validator'

const groupRouter = express.Router()

groupRouter.get('/group', GroupController.getGroupList)
groupRouter.get('/group/:id', GroupController.getGroupById)
groupRouter.post('/group', GroupController.addGroup)
groupRouter.put('/group/:id', GroupController.updateGroup)
groupRouter.delete('/group/:id', GroupController.deleteGroup)
groupRouter.post('/group/add-to-users', validator.body(userGroupSchema), GroupController.addUsersToGroup)

export default groupRouter
