const express = require('express')
const router = express.Router()
const {customerPaymentCheckOut,customerSubscription } = require('../controllers/customerController')

// Create a customer and redirect to Stripe checkout

router.post('/create-payment-checkout',customerPaymentCheckOut );


// Subscribe a customer to a product plan
router.post('/create-subscription',customerSubscription )



// Update a customer's subscription
router.get('/update-subscription',()=>{})



// Delete a customer's subscription
router.get('/delete-subscription',()=>{})

module.exports= router
