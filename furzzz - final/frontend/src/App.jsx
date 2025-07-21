import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';
import Appointments from './pages/Appointments/Appointments';
import MyAppointments from './pages/MyAppointments/MyAppointments';  // Import MyAppointments here
import PetMatch from './pages/PetMatch/PetMatch';
import Trainer from './pages/Trainer/Trainer';  // Import Trainer here
import PetFood from './pages/PetFood/PetFood';  // Import PetFood here

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/myappointments" element={<MyAppointments />} /> {/* Add route for MyAppointments */}
          <Route path="/petmatch" element={<PetMatch />} />
          <Route path="/trainer" element={<Trainer />} /> {/* Add route for Trainer */}
          <Route path="/petfood" element={<PetFood />} /> {/* Add route for PetFood */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
