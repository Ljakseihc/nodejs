import express from 'express'
import helmet from 'helmet'
import userRouter from './controllers/routers/user-router'
import sequelize from './config/sequlize'
import { initDataBase, createEntities } from './data-access/init'
import groupRouter from './controllers/routers/group-routes'

const PORT = 8080
const server = express()

server.use(helmet({ contentSecurityPolicy: false, referrerPolicy: false }))
server.use(express.json({ limit: '300kb' }))
server.use(express.urlencoded({ limit: '300kb', extended: true }))
server.use(userRouter);
server.use(groupRouter)

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




