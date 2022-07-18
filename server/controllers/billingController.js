const stripe = require('stripe')(process.env.stripeSecretKey)
const e = require('express')
const stripex = require('stripe')

const User = require('../models/User')

const Stripe = stripex(
    process.env.stripeSecretKey,{
    apiVersion: '2020-08-27'
  }
)

const createPayment = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        customer_email: req.body.email,
        success_url: 'http://localhost:3000/surveys?success=true',
        cancel_url: 'http://localhost:3000/surveys',
        line_items: [
          {price: 'price_1LKhqeSBnAvIK2tLxUqW1agd', quantity: 1},
        ],
        mode: 'payment',
      })
    res.json({ url: session.url })  
}

const webhookListener = async (req, res) => {
  console.log("A WEBHOOK RECIEVED")
  let event
  try {
    event = Stripe.webhooks.constructEvent(
      req.body,
      req.header('Stripe-Signature'),
      process.env.webhookSecret
    )
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
  const data = event.data.object
  console.log(event.type)
  switch(event.type){
    case "payment_intent.succeeded": 
      console.log(data.charges.data[0].billing_details.email)
      const email = data.charges.data[0].billing_details.email
      const user = await User.findOne({email: email})
      if(user){
         user.credits += 5
         await user.save()
      }
    default:
  }
  res.sendStatus(200)
}



module.exports = {
    createPayment,
    webhookListener
}