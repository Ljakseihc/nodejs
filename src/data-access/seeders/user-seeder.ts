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
    login: 'User3',
    password: 'user3Password',
    age: 41,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'User4',
    password: 'user4Password',
    age: 11,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'User5',
    password: 'user5Password',
    age: 33,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'User6',
    password: 'user6Password',
    age: 27,
    isDeleted: false,
  },
]
