const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const stripe = new Stripe("sk_test_51JRVeQJTERusYsAhw70EOLeDum07ZdnmFT6iFS2XbS1oFS9FR5OjFGNlDPXNO0xaXkmil6pTK9v3qhDI7mKBHVFA00WCYaFP0e")

const app = express();

//midleware

app.use(cors({origin: "http://localhost: 3000"}));
app.use(express.json())

app.post("/api/checkout", async (req, res) => {
console.log(req.body);

const {id, amount} = req.body;

try {
const payment = await stripe.paymentIntents.create({
    amount,
    currency: "USD",
    descripcion: "Basket of products",
    payment_method: id,
    confirm: true,

})
console.log(payment)
return res.status(2000).json({message : "Succesful payment"});
  
} catch(error){
    return res.json({message: error.raw.message})
}
});




app.listen(3001, ()=>{ 
    console.log("Server listening port", 3001);
});