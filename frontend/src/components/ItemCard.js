import React from "react";
import Axios from "axios";
import useAxios from "../utils/useAxios";
import { IMG_CLDNRY } from "../constants";

const ItemCard = ({ name, place, price }) => {
    const axiosInstance = useAxios(); // Create the Axios instance

    const handleBuyNow = () => {
      const orderData = {
        product_name: name,
        delivery_place: place,
        price,
      };
  
      axiosInstance
        .post("/order-payment/create-order/", orderData)
        .then((response) => {
          console.log("Order created successfully:", response.data);
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
      <h6 className="text-xs py-2 font-medium mt-auto">₹ {price}</h6>
      <button
        className="bg-teal-700 text-white py-1 my-1"
        onClick={handleBuyNow}
      >
        Buy Now
      </button>
    </div>
  );
};

export default ItemCard;