import express from 'express'
import helmet from 'helmet'
import userRouter from './controllers/routers/user-router'
import sequelize from './config/sequlize'
import { initDataBase, createEntities } from './data-access/init'
import groupRouter from './controllers/routers/group-routes'
import authRouter from './controllers/routers/auth-router'
import errorHandler from './logger/error-handler'
import cors from 'cors'
import { checkToken } from './security/checking-token'

const PORT = 8080
const server = express()

const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200
};

server.use(helmet({ contentSecurityPolicy: false, referrerPolicy: false }))
server.use(express.json({ limit: '300kb' }))
server.use(express.urlencoded({ limit: '300kb', extended: true }))
server.use(checkToken, userRouter);
server.use(checkToken, groupRouter)
server.use(authRouter)
server.use(errorHandler)
server.use(cors(corsOptions))

server.listen(PORT, async () => {
  await sequelize.sync()
  await initDataBase()
    .then(() => {
      console.log("Database connected...");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    })
  
  await createEntities()
  console.log(`Go to http://localhost:${PORT}`)
})




