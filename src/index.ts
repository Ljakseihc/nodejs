import express from 'express'
import helmet from 'helmet'
import router from './routers/user-router'

const PORT = 7070
const server = express()

server.use(helmet({ contentSecurityPolicy: false, referrerPolicy: false }))
server.use(express.json({ limit: '300kb' }))
server.use(express.urlencoded({ limit: '300kb', extended: true }))
server.use(router);

server.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}`)
})
