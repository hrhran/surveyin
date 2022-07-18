const express = require('express')
const router = express.Router()
const { createPayment, webhookListener } = require('../controllers/billingController')

router.post('/api/stripe', createPayment)
router.post('/api/payment', webhookListener)


module.exports = router