import React, { useState } from "react";
import Axios from "axios";
import useAxios from "../utils/useAxios";
import { IMG_CLDNRY } from "../constants";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; 

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
console.log("stripePromise: ",stripePromise);

const ItemCard = ({ name, place, price }) => {
    const axiosInstance = useAxios();
    const [isPaymentVisible, setPaymentVisible] = useState(false);
    const [clientSecret, setClientSecret] = useState(null)
    console.log("clientSecret: ",clientSecret);

    const handleBuyNow = (e) => {
      e.preventDefault()
      setPaymentVisible(true);
      const orderData = {
        product_name: name,
        delivery_place: place,
        product_price: price,
      };
      axiosInstance
      .post("/order-payment/create-order/", orderData)
      .then((response) => {
        console.log("Order created successfully:", response.data);
        setClientSecret(response.data.client_secret);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
    };

  return (
    <div className="flex flex-col justify-around p-4 m-2 w-64 bg-orange-200 shadow-lg rounded-md h-[90%]">
      <img className="py-2" src={IMG_CLDNRY} alt="image" />
      <h2 className="font-medium text-sm py-4">{name}</h2>
      <h5 className="text-xs">{place}</h5>
      <h6 className="text-xs py-2 font-medium mt-auto">AED {price}</h6>
      <button
        className="bg-teal-700 text-white py-1 my-1 rounded-md"
        onClick={handleBuyNow}
      >
        Buy Now
      </button>
      {isPaymentVisible && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            productName={name}
            productPrice={price}
            clientSecret={clientSecret}
          />
        </Elements>
      )}
    </div>
  );
};

export default ItemCard;