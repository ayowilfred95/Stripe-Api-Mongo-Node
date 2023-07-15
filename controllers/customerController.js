const Customer = require('../models/customerModel')
const stripe = require('stripe')(process.env.STRIPE_KEY);
require('dotenv').config()



// create customer STRIPE request and direct customer to STRIPE checkout
/**
 * @dev it is important to create the product in your stripe 
 * dashboard and make sure the price is in id not the actual amount
 */
const customerPaymentCheckOut = async (req,res)=>{
try{

    const { email, product } = req.body;

    // create a customer in mongoDB
    const customer = await Customer.create({email,product})

      // Create a customer in Stripe
      const stripeCustomer = await stripe.customers.create({
        email: customer.email,
        description: 'Customers created for stripe product',
      });

      // create a subscription session with stripe Checkout
    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomer.id,
        payment_method_types: ['card'],
        line_items: [
            {
                price: 'price_1NTnYEKPGLOQehLklS1Jm9i8',
                quantity: 1,
              },
        ],

        mode: 'payment',
        success_url: 'https://localhost:8000?success=true',
        cancel_url: 'https://localhost:8000?canceled=true',
        metadata: {
            customerId: stripeCustomer.id, // Store customer ID as metadata for future reference
          },
    });

    // was looking for data to query
    res.json({session});

    // Found sesson.url
    //res.redirect(303, session.url);

}catch(error){
    console.log('Error creating payment checkouts:', error);
    res.status(500).json({error:error.message});
}

}

/**
 * @dev CreateSubscritpion
 */
// subscribe customer (X) to a stripe product plan P1 (keep id subscription for future db storage) after complete the checkout payment
const customerSubscription = async (req,res)=>{
    try{
        const sessionId = req.body.session.id;

        // Retrieve the checkout session from the stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if(session.payment_status == 'paid') {
            //Retrieve customer ID and subscription ID from session metadata

            // Retrieve customer ID from session metadata
                const customerId = session.metadata.customerId;

         // Attach payment source or set default payment method
          await stripe.subscriptions.update(
            customerId,
            {
              payment_settings: {
                payment_method_types: session.payment_method,
              },
            }
          );

            const subscription = await stripe.subscriptions.create({
                customer:customerId,
                items: [
                  {price: 'price_1NTzaiKPGLOQehLkiNkuQVep'},
                ],
              });


        // Update the customer document in MongoDB with the subscription ID
        await Customer.findByIdAndUpdate(customerId, { subscriptionId: subscription.id });
        res.status(200).json({subscription});
    } else {
      res.status(400).json({ error: 'Payment not completed for the session' });
    }
    }catch(error){
        console.log('Error creating subscription:', error);
        res.status(500).json({ error: error.message });
    }
}




//  update customer (X) product plan P1 subscription (Switch from plan P1 to plan P2)
const customerUpdate = async ()=>{

}

// delete customer (X) subscription P
// Simulate customer with variables for example custom@gmail.com 
//Keep data that could be useful to store in DB in variables with well defined names and well commented as well (example idSubscription).

const customerDeleteSubscription = async ()=> {

}

module.exports = {customerPaymentCheckOut,customerSubscription  }
