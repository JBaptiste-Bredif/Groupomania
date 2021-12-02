const express = require('express')
const helmet = require("helmet")
const path = require('path')
const cors = require('cors')
const { Sequelize } = require('sequelize')

require('dotenv').config({ path: process.cwd() + '/.env' })

const app = express()

// const userRoutes = require('./routes/route-user')
// const sauceRoutes = require('./routes/route-sauce')

app.use(helmet()) // XSS Protection
app.use(cors()) // Headers Access-Control-Allow-Origin settings

app.use(express.urlencoded({
    extended: true
}))

const sequelize = new Sequelize(process.env.DB, process.env.DB_LOGIN, process.env.DB_PWD, {
    host: process.env.HOST,
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.log('Connection failed : ' + error))


app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

// app.use('/api/auth', userRoutes)
// app.use('/api/sauces', sauceRoutes)

module.exports = app