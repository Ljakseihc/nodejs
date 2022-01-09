import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import { User } from '../data-access/tables/user-table'
import { ForbiddenError } from '../logger/error'
import logger from '../logger/logger'
import { UsersService } from '../services/user-service'

const usersService = new UsersService(User)

class AuthController {

    authUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { login, password } = req.body
            const user = await usersService.getUserByLogin(login)

            if (!user || password !== user.password) {
                return next(new ForbiddenError('Invalide authorization data.'))
            }

            const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: 10000 })
            return res.json({ token })
        } catch (error) {
            logger.error(error)
            return next(error)
        }
    }
}

export default new AuthController()
