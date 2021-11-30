import { Sequelize } from 'sequelize'
require('dotenv').config()

const {
  DB_HOST = '', DB_PORT, DB_NAME = '', DB_USERNAME = '', DB_PASSWORD = '',
} = process.env;


const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  port: Number(DB_PORT),
})

export default sequelize
