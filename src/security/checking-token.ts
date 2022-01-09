import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../logger/error'

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.url === "/auth") {
    return next()
  }
  const token = req.headers.authorization as string
  if (token) {
    jwt.verify(token.replace("Bearer ", ""), 'secret', (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Invalide token.' })
      } else {
        next()
      }
    })
  } else {
    next(new UnauthorizedError('No token provided.'))
  }
}
