const functions = require("firebase-functions");
const express = require("express");
const cors= require("cors");

const stripe = require("stripe")
('your secret api key')

//API


//App config
const app = express();

//middlewares
app.use(cors({origin: true}));
app.use(express.json());

//api routes
app.get('/', (request, response) => response.status(200).send("hello world"))

app.post('/payments/create', async(request, response) => {
    const total = request.query.total;

    console.log('Payment Request Received for this amount>>>>', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,  //subunits of currency
        currency: "inr",
    });
    // ok- created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//listen command
exports.api = functions.https.onRequest(app)

//example endpoint
//http://localhost:5001/clone-e5f5d/us-central1/api
