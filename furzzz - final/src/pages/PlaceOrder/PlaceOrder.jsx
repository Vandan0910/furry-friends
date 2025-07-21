import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const [data, setData] = useState({ firstName: "", lastName: "", email: "", table_Number: "", phone: "" });
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (getTotalCartAmount() === 0) {
      navigate("/");
    }
  }, [getTotalCartAmount, navigate]);

  const placeOrderHandler = async () => {
    if (!localStorage.getItem("userId")) {
      alert("Please log in to place an order.");
      return;
    }

    const orderData = {
      userId: localStorage.getItem("userId"),
      items: cartItems,
      amount: getTotalCartAmount(),
      address: { tableNumber: data.table_Number },
    };

    try {
      const response = await axios.post("http://localhost:4000/api/order/placecod", orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        alert("Order placed successfully!");
        navigate("/myorder");
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error.response);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <input type="text" name="table_Number" value={data.table_Number} onChange={(e) => setData({ ...data, table_Number: e.target.value })} placeholder="Table Number" />
      <button onClick={placeOrderHandler}>Place Order (COD)</button>
    </div>
  );
};

export default PlaceOrder;
