import { v4 as uuid } from 'uuid';
import { User } from '../types/user';
import { Request, Response } from 'express';
import { compareLogins } from '../utils/comparator';
import { ValidatedRequest } from 'express-joi-validation';
import { UserRequestSchema } from '../utils/validator';

let usersInternalList: User[] = [];

class UserController {

    getUserById = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = usersInternalList.find(u => u.id === id);

            if (user && !user.isDeleted) {
                return res.send(user);
            }

            return res.status(400).json({ error: 'User has not been found by id' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    getUserList = (req: Request, res: Response) => {
        try {
            const limit = 20;
            const usersList = usersInternalList
                .sort((firstUser, secondUser) => compareLogins(firstUser.login, secondUser.login))
                .filter((user, index) => !user.isDeleted && index < limit);
            return res.json(usersList);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    addUser = (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
        try {
            const { login, password, age } = req.body;
            const existedUser = usersInternalList.find(user => user.login === login);

            if (existedUser) return res.status(400).json({ error: 'User already exists' });

            const newUser: User = {
                login,
                password,
                age,
                id: uuid(),
                createdAt: new Date().toISOString(),
                isDeleted: false,
            };

            usersInternalList = [...usersInternalList, newUser];

            return res.json(newUser);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    updateUser = (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
        try {
            const { id } = req.params;
            let userExists = false;

            usersInternalList = usersInternalList.map(user => {
                if (user.id === id) {
                    userExists = true;
                    return { ...user, ...req.body };
                }
                return user;
            });

            if (userExists) return res.json({ message: 'User has been updated' });

            return res.status(400).json({ error: 'User has not been found in db' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    };


    deleteUser = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            let userExists = false;

            usersInternalList = usersInternalList.map(user => {
                if (user.id === id) {
                    userExists = true;
                    return { ...user, isDeleted: true };
                }
                return user;
            });

            if (userExists) {
                return res.json({ message: 'User has been deleted' });
            }

            return res.status(400).json({ error: 'User has not been found in db' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

}

export default new UserController()