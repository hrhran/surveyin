const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn')
const hasCredits = require('../middlewares/hasCredits')

const { createSurvey } = require('../controllers/surveyController')

router.post('/api/surveys', isLoggedIn, hasCredits, createSurvey)

module.exports = router