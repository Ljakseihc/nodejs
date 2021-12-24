import { NextFunction, Request, Response } from 'express'
import { UsersService } from '../services/user-service'
import { User } from '../data-access/tables/user-table'
import { NotFoundError } from '../logger/error'
import logger from '../logger/logger'

const usersService = new UsersService(User)

class UserController {

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const user = await usersService.getUserById(id)
            if (!user) throw new NotFoundError()
            return res.json(user)
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }

    getUserList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await usersService.getUserList()
            return res.json(users)
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }

    addUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newUser = await usersService.addUser(req.body)
            return res.json(newUser)
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const userId = await usersService.updateUser(id, req.body);
            if (!userId) throw new NotFoundError()
            return res.json({ message: 'User has been updated' })
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }


    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const userId = await usersService.deleteUser(id)
            if (!userId) throw new NotFoundError()
            return res.json({ message: 'User has been deleted' })
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }

}

export default new UserController()
