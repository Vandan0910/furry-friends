import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
    setCartItems,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      toast.error("To place an order, sign in first");
      navigate("/cart");
    }
  }, [token]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("To place an order, sign in first");
      navigate("/cart");
      return;
    }

    let orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: cartItems[item._id],
        price: item.price,
      }));

    let totalAmount = getTotalCartAmount() + deliveryCharge;
    if (totalAmount <= 0) {
      toast.error("Invalid order amount");
      return;
    }

    let orderData = {
      address: { ...data },
      items: orderItems,
      amount: totalAmount,
      paymentMethod,
    };

    if (paymentMethod === "COD") {
      try {
        let response = await axios.post(url + "/api/orders/place", orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          toast.success(response.data.message);
          setCartItems({});
          navigate("/myorders");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Failed to place order");
      }
    } else {
      handleRazorpay(totalAmount, orderItems, data);
    }
  };

  const handleRazorpay = async (amount, orderItems, address) => {
    try {
      const response = await axios.post(
        url + "/api/orders/razorpay",
        { amount, currency: "INR" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success || !response.data.order) {
        toast.error("Failed to initialize payment");
        return;
      }

      const { order } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Furry Friends",
        description: "Pet Shop Order Payment",
        order_id: order.id,
        handler: async function (response) {
          console.log("🔹 Razorpay Response:", response);

          try {
            const verifyRes = await axios.post(
              url + "/api/orders/verify",
              {
                ...response,
                order_id: order.id,
                amount,
                items: orderItems,
                address,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            console.log("🔹 Verification Response:", verifyRes.data);

            if (verifyRes.data.success) {
              toast.success("Payment Successful! Order placed.");
              setCartItems({});
              navigate("/myorders");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("🔴 Payment Verification Error:", error);
            toast.error("Payment verification error");
          }
        },
        prefill: {
          name: `${address.firstName} ${address.lastName}`,
          email: address.email,
          contact: address.phone,
        },
        theme: { color: "#f54242" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.error("Payment initialization failed");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First name" required />
          <input type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last name" required />
        </div>
        <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email address" required />
        <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" required />
        <div className="multi-field">
          <input type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" required />
          <input type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" required />
        </div>
        <div className="multi-field">
          <input type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip code" required />
          <input type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" required />
        </div>
        <input type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{currency}{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{currency}{deliveryCharge}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{currency}{getTotalCartAmount() + deliveryCharge}</b>
          </div>
        </div>
        <div className="payment-options">
          <button type="button" className={`payment-button cod ${paymentMethod === "COD" ? "selected" : ""}`} onClick={() => setPaymentMethod("COD")}>Cash on Delivery</button>
          <button type="button" className={`payment-button razorpay ${paymentMethod === "Razorpay" ? "selected" : ""}`} onClick={() => setPaymentMethod("Razorpay")}>Pay with Razorpay</button>
        </div>
        <button type="submit" className="place-order-submit">Place Order</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
