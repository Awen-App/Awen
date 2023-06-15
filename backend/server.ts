import express from "express"
import cors from 'cors'
import routeUser from './routes/userRoutes'
import causeRoute from "./routes/causeRoutes";
import organizationRoute  from './routes/organizations'
import donationRoute from './routes/donationRoutes'
const app=express();
const stripSecretKey=process.env.STRIPE_API_SECRET;
const stripePublicKey=process.env.STRIPE_API_PUBLIC
const stripe = require('stripe')(stripSecretKey);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(routeUser)
app.set("view engine","ejs")
app.use(causeRoute)

app.use(organizationRoute)

app.use(donationRoute)

// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

app.post('/payment-sheet', async (req, res) => {//
  
try{
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2022-11-15'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:stripePublicKey
  });
  console.log(customer)
}
catch(err){
  res.status(404)
  console.log(err)

}
  
});


app.listen(3001,()=>{
    console.log("server listen to port 3001")
})
const main=()=>{
    console.log("learninig prisma")
}

main()
