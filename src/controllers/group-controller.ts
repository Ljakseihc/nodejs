import { Request, Response, NextFunction } from "express"
import { GroupsService } from "../services/group-service"
import { Group } from '../data-access/tables/group-table'
import logger from "../logger/logger"
import { NotFoundError } from "../logger/error"

const groupService = new GroupsService(Group)

class GroupController {

    getGroupById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const group = await groupService.getGroupById(id)
            if (!group) throw new NotFoundError()
            return res.json(group)
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }

    getGroupList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const group = await groupService.getGroupList()
            return res.json(group)
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }

    addGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, permissions } = req.body;
            const group = await groupService.addGroup({ name, permissions })
            res.send(group)
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }

    updateGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { name, permissions } = req.body
            const group = await groupService.updateGroup(id, { name, permissions })
            if (!group) throw new NotFoundError()
            res.send(group);
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }

    deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const groupId = await groupService.deleteGroup(id)
            if (!groupId) throw new NotFoundError()
            return res.json({ message: 'Group has been deleted' })
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }

    addUsersToGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await groupService.addUsersToGroup(req.body)
            return res.send(response)
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }
} 

export default new GroupController()
