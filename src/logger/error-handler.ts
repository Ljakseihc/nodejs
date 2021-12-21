import { Request, Response, NextFunction } from "express"
import logger from "../logger/logger"
import { HttpError } from "../logger/error"

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err?.status) {
        const { params, query, body } = req
        const args = JSON.stringify({ params, query, body })
        logger.error(
            `Method: ${req.method}; Arguments: ${args}; Error message: ${err.message}`
        )
        res.status(err.status).send(err.message)
    } else {
        logger.error(`Internal error: ${err.stack}`)
        res.status(500).send("Internal server error")
    }
    next()
}

export default errorHandler
