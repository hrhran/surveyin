const passport = require('passport')
const express = require('express')
const router = express.Router()
const { handleStripeToken, webhookListener } = require('../controllers/billingController')

router.post('/api/stripe', handleStripeToken)
router.post('/api/payment', webhookListener)


module.exports = router