const express = require('express')
const passport = require('passport')
const session = require('cookie-session')
const dotenv = require('dotenv').config()
const connectDB = require('./config/database')
const PORT = process.env.PORT || 5000
connectDB()
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(session({ 
    maxAge: 2592000000,//30days
    keys: [process.env.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(authRoutes)

app.listen(PORT,() =>{
    console.log("Backend is running")
})

