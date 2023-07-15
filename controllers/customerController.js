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

    const customer = await Customer.create({email,product})

    const session = await stripe.checkout.sessions.create({
        customer: customer._id,
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

        // create a customer first
        const customer = await stripe.customers.create({
            description: 'Customers created for stripe product',
          });
        
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
              {price: 'price_1NTzaiKPGLOQehLkiNkuQVep'},
            ],
          });

           // Store subscription.id in your MongoDB
    await Customer.collection(customer).insertOne({ subscriptionId: customer.id });

    console.log('Subscription created:', subscription);


    }catch(error){
        console.error('Error creating subscription:', error);
        res.status(500).send('Error creating subscription: ' + error.message);
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
