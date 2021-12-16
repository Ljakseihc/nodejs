import { v4 as uuidv4 } from 'uuid'
import { UserInterface } from '../../model/user-model'

export const users: UserInterface[] = [
  {
    id: uuidv4(),
    login: 'User1',
    password: 'user1Password',
    age: 21,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'User2',
    password: 'user2Password',
    age: 31,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'Admin1',
    password: 'user3Password',
    age: 41,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'Admin2',
    password: 'user4Password',
    age: 11,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'Moderator1',
    password: 'user5Password',
    age: 33,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'Moderator2',
    password: 'user6Password',
    age: 27,
    isDeleted: false,
  },
]
