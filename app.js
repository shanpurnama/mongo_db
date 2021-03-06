require('dotenv').config()

const express = require('express')
const app = express()
const port = 3001

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kn4zw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

const userRouter = require('./routes/user')
const todoRouter = require('./routes/todo')
const projectRouter = require('./routes/project')


app.use('/users', userRouter)
app.use('/todos', todoRouter)
app.use('/projects', projectRouter)





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })