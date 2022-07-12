const passport = require('passport')
const express = require('express')
const router = express.Router()
const { googleAuthForward, googleAuthCallback, redirectAfterGoogleAuth, currentUser, logoutUser } = require('../controllers/authController')

router.get('/auth/google', googleAuthForward)
router.get('/auth/google/callback', googleAuthCallback, redirectAfterGoogleAuth)
router.get('/api/currentuser', currentUser)
router.get('/api/logout', logoutUser
)

module.exports = router