require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const contactRouter = require('./routes/contact.js')
const ivrRouter = require('./routes/ivr.js')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {

    req.body = {
        ...req.query,
        ...req.params,
        ...req.body
    };

    next()
})

app.use('/contact', contactRouter)
app.use('/', ivrRouter)

const PORT = process.env.PORT 

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})