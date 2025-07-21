import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create StoreContext
export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const url = "http://localhost:4000"; // Ensure correct backend URL
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Token from localStorage
  const currency = "₹";
  const deliveryCharge = 50;

  // Function to add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
    }
  };

  // Function to remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });

    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
    }
  };

  // Function to get total cart amount
  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const item = food_list.find((product) => product._id === itemId);
      return item ? total + item.price * cartItems[itemId] : total;
    }, 0);
  };

  // Function to fetch food list
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  // Function to load cart data
  const loadCartData = async () => {
    if (!token) return;
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { Authorization: `Bearer ${token}` } });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data: ", error.response?.data || error.message);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchFoodList();
    if (token) {
      loadCartData();
    }
  }, [token]);

  return (
    <StoreContext.Provider value={{ url, food_list, cartItems, addToCart, removeFromCart, getTotalCartAmount, token, setToken, loadCartData, setCartItems, currency, deliveryCharge }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
