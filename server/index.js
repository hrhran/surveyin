const express = require('express')
const passport = require('passport')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const connectDB = require('./config/database')
const PORT = process.env.PORT || 5000
connectDB()
const authRoutes = require('./routes/authRoutes')
const billingRoutes = require('./routes/billingRoutes')

const app = express()

app.use('/api/payment',bodyParser.raw({ type: 'application/json' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({ 
    maxAge: 2592000000,//30days
    keys: [process.env.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(authRoutes)
app.use(billingRoutes)

app.listen(PORT,() =>{
    console.log("Backend is running")
})

