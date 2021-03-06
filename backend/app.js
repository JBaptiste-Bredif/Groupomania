const express = require('express')
const helmet = require("helmet")
const path = require('path')
const cors = require('cors')
// plugin cloundiary ou contentfull 
require('dotenv').config({ path: process.cwd() + '/.env' })

const app = express()
const { database } = require('./models/index');

const userRoutes = require('./routes/route-user')
const likeRoutes = require('./routes/route-like')
const commentRoutes = require('./routes/route-comment')
const publicationRoutes = require('./routes/route-publication')

app.set('trust proxy', 1) // Heroku - Rate Limit
app.use(helmet()) // XSS Protection
app.use(cors()) // Headers Access-Control-Allow-Origin settings

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))


database.authenticate()
  .then(() => {
    console.log('Connection successfull !')
  })
  .catch((error) => {
    console.log('Error : ' + error)
  })

app.use('/api/auth', userRoutes)
app.use('/api/like', likeRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/publication', publicationRoutes)

module.exports = app