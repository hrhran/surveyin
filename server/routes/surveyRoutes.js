const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn')
const hasCredits = require('../middlewares/hasCredits')

const { createSurvey, listenSendgrid, getSurvey, thankUser } = require('../controllers/surveyController')

router.post('/api/surveys/webhook', listenSendgrid)
router.get('/api/surveys/:surveyId/:choice', thankUser)
router.get('/api/surveys', getSurvey)
router.post('/api/surveys', isLoggedIn, hasCredits, createSurvey)


module.exports = router