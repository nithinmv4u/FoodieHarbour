import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ productName, productPrice, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Customer Name",
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("Payment succeeded!");
    }
  };

  return (
    <div className="my-2">
        <form onSubmit={handleSubmit} className="bg-white p-2">
            <div className="p-2">
            <CardElement/>
            </div>
            
            <button className="bg-blue-700 rounded-md p-1 text-white" type="submit" disabled={!stripe}>
                Pay AED {productPrice} for {productName}
            </button>
        </form>
    </div>
    
  );
};

export default CheckoutForm;