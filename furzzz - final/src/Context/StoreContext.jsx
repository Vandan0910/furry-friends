import { createContext, useState } from "react";
import { food_list, menu_list } from "../assets/assets"; // You already have your food and menu lists

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [ordersData, setOrdersData] = useState({});

  // Add item to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
    }));
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product.food_id === Number(item));
        totalAmount += itemInfo.food_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Place an order
  const placeOrder = (deliveryData) => {
    console.log('Order Data:', deliveryData);
    setOrdersData(deliveryData);
    // Here you can send the order data to your backend API (using axios or fetch)
    // For now, we're just logging it, you can replace this with an actual API call
  };

  const contextValue = {
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    placeOrder,
    ordersData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
