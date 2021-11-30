import { Request, Response } from 'express'
import { ValidatedRequest } from 'express-joi-validation'
import { UserRequestSchema } from '../utils/validator'
import { UsersService } from '../services/user-service'
import { User } from '../data-access/tables/user-table'

const usersService = new UsersService(User)

class UserController {

    getUserById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const userById = await usersService.getUserById(id)
            return res.status(400).json(userById)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    getUserList = async (req: Request, res: Response) => {
        try {
            const usersList = await usersService.getUserList()
            return res.json(usersList)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    addUser = async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
        try {
            const newUser = await usersService.addUser(req.body)
            return res.json(newUser)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    updateUser = async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
        try {
            const { id } = req.params
            const userExists = await usersService.updateUser(id, req.body);

            if (userExists) return res.json({ message: 'User has been updated' })
            return res.status(400).json({ error: 'User has not been found in db' })
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }


    deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userExists = await usersService.deleteUser(id)
            if (userExists) return res.json({ message: 'User has been deleted' })
            return res.status(400).json({ error: 'User has not been found in db' })
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

}

export default new UserController()
