# Development of a local nodejs server based app to connect with STRIPE API .API CALLS IMPLEMENTATIONS:

#	CreateOnePaymentCheckout: create customer STRIPE request and direct customer to STRIPE checkout (use most secure practice development)
#	CreateSubscritpion: subscribe customer (X) to a stripe product plan P1 (keep id subscription for future db storage) after complete the checkout payment
#	UpdateSubscritpion: update customer (X) product plan P1 subscription (Switch from plan P1 to plan P2)
#	DeleteSubscritpion: delete customer (X) subscription P

# Simulate customer with variables for example custom@gmail.com Keep data that could be useful to store in DB in variables with well defined names and well commented as well (example idSubscription).
# When an api call works good, just print in console a positive message otherwise a negative message. In example if a customer can process a one time payment: payment processed successfully. etc…

# Make sure with real test and real cards(test/production) that payment work for all the main type of cards in CA,US,EU. 
# Use a github repository to upload the code.
# Follow the best coding practice to manage error/exception by using the right message and write clear comments
