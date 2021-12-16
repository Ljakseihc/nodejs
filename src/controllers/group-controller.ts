import { Request, Response } from "express"
import { GroupsService } from "../services/group-service"
import { Group } from '../data-access/tables/group-table'
import { ValidatedRequest } from "express-joi-validation"
import { UserGroupRequestBodySchema } from "../utils/validator"

const groupService = new GroupsService(Group)

class GroupController {

    getGroupById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const group = await groupService.getGroupById(id)
            return res.json(group)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    getGroupList = async (req: Request, res: Response) => {
        try {
            const group = await groupService.getGroupList()
            return res.json(group)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    addGroup = async (req: Request, res: Response) => {
        try {
            const { name, permissions } = req.body;
            const group = await groupService.addGroup({ name, permissions })
            res.send(group)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    updateGroup = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { name, permissions } = req.body
            const group = await groupService.updateGroup(id, { name, permissions })
            res.send(group);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    deleteGroup = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const groupId = await groupService.deleteGroup(id)
            if (groupId) return res.json({ message: 'Group has been deleted' })
            return res.status(400).json({ error: 'Group has not been found in db' })
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    addUsersToGroup = async (req: ValidatedRequest<UserGroupRequestBodySchema>, res: Response) => {
        try {
            const response = await groupService.addUsersToGroup(req.body)
            return res.send(response)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
} 

export default new GroupController()
