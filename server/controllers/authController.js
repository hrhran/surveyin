const passport = require('passport')
const googleStrategy  = require('passport-google-oauth20').Strategy
const dotenv = require('dotenv').config()
const User = require('../models/User')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user)
    })
})

passport.use(new googleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: '/auth/google/callback '
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).then((existingUser) => {
        if(existingUser){
           done(null, existingUser)
           console.log(profile)
           console.log("existing")
        }else{
            console.log(profile)
            new User({ googleId: profile.id, email: profile.emails[0].value}).save()
            .then((user) => done(null, user))
           console.log("created")
        }
    })
})
)

const googleAuthForward = passport.authenticate('google',{
        scope: ['profile', 'email']
    })

const googleAuthCallback = passport.authenticate('google')

const redirectAfterGoogleAuth = (req, res) =>{
    res.redirect('/surveys')
}

const currentUser = (req, res) => {
    res.send(req.user)
}

const logoutUser = (req, res) => {
    req.logout()
    res.redirect('/')
}

module.exports = {
    googleAuthForward,
    googleAuthCallback,
    redirectAfterGoogleAuth,
    currentUser,
    logoutUser
}