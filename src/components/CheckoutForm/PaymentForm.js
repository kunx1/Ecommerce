import { Button, Divider, Typography } from '@material-ui/core'
import Review  from './Review'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {loadStripe} from "@stripe/stripe-js"
import { getBasketTotal } from '../../reducer';

import { actionTypes } from '../../reducer';
import axios from "axios" 
import { useStateValue } from '../../StateProvider';
import { accounting } from 'accounting'


const stripePromise = loadStripe("pk_test_51JRVeQJTERusYsAhgnYXqcZGLOPm5jtGEgJTVBO5hH70GQ4sBNaCLPtoqtXLKfuOZdGMKgbfq4bAnu3KnPluu6YA00HuNTej4Z")

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style:{
    base:{
      iconColor:"rgb(240, 57, 122)",
      color:"#333",
      fontsize:"18px",
      "::placeholder": {
        color: "#ccc",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus":{
        color: "#303238",
      },
    },
  },
};



const CheckoutForm = ({backStep, nextStep}) => {
  const [{ basket, paymentMessage }, dispatch] = useStateValue(); /* en esta linea agregue paymentMessage */
  
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if(!error){
      const {id} = paymentMethod;
      try { 
        const { data } = await axios.post("http://localhost:3001/api/checkout",
        {
        id: id,
        amount: getBasketTotal(basket) * 100,
      }
      );
      console.log(data)
      dispatch({
        type: actionTypes.SET_PAYMENT_MESSAGE,
        paymentMessage: data.message,
      });
        /* aqui va...    alert(data.message) */
      elements.getElement(CardElement).clear();
      nextStep();
    } catch(error) {
        console.log(error);
        nextStep();
      }
      
      
    }
  }



  return (
  <form onSubmit={ handleSubmit }>
    <CardElement options={CARD_ELEMENT_OPTIONS}/>
    <div style={{display:'flex', justifyContent: "space-between", marginTop: "1rem"}}>
      <Button variant='outlined' onClick={backStep}>Back</Button> 
      <Button disabled={false} type='submit' variant='contained' 
      color='primary' onClick={nextStep}>{`Pay ${accounting.formatMoney(getBasketTotal(basket), "$")}` }</Button>
    </div>
  </form>
  )
}


const PaymentForm = ({backStep, nextStep}) => {
  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom style={{margin: "20px 0"}}>
        Payment Metod
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm backStep={backStep}  nextStep={ nextStep}/>
      </Elements>
    </>
  )
}

export default PaymentForm
