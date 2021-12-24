import express from 'express'
import GroupController from '../group-controller'
import { groupRequestValidation, requestIdValidation } from '../../utils/validator'

const groupRouter = express.Router()

groupRouter.get('/group', GroupController.getGroupList)
groupRouter.get('/group/:id', requestIdValidation, GroupController.getGroupById)
groupRouter.post('/group', GroupController.addGroup)
groupRouter.put('/group/:id', requestIdValidation, GroupController.updateGroup)
groupRouter.delete('/group/:id', requestIdValidation, GroupController.deleteGroup)
groupRouter.post('/group/add-to-users', groupRequestValidation, GroupController.addUsersToGroup)

export default groupRouter
