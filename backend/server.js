const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const Error_Handlor = require('./middlewares/Error_Handler')
const Google_Auth = require('./controllers/Google_Auth')
const Connect_DB = require('./db/Connect_DB')
const Router = require('./router/Auth.Router')
const Facebook_Auth = require('./controllers/Facebook_Auth')
require('dotenv').config()

const app = express()
    ///middle used
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(morgan('dev'))

//connect to DB
Connect_DB()
    //Google Authantication
Google_Auth()
    //Google Authantication
Facebook_Auth()



///routes
app.use('/api/v1', Router)







app.use(Error_Handlor)

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`.bgGreen)
})