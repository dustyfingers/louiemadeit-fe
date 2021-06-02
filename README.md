## local setup prerequisites:

nodejs/npm

## PROJECT SETUP:

# step 1:

navigate to project dir

# step 2:

run 'yarn install'

# step 4:

run 'yarn start'

# to listen for test payment_intent events on windows, run this where stripe is downloaded

// ./stripe.exe listen --forward-to localhost:5000/stripe/webhooks/handle-payment-intent
