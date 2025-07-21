# 🐾 Furry Friends – Pet Care & E-Commerce Platform

**Furry Friends** is an all-in-one pet care and e-commerce web application that helps pet owners manage grooming appointments, find training resources, discover products, and shop tailored to their pet's needs. From AI-based breed detection to video training to a personalized store — it brings convenience and care under one roof.

---

## 🌟 Features

### 🔐 User Authentication
- Secure sign-up and login system
- Distinct roles for **Users** and **Admins**
- Validation for correct credentials (email/password)

### 📆 Pet Service Booking
- Book appointments for services like grooming, training, etc.
- Choose service type, date, and time
- Input pet and owner details for scheduling

### 📹 Training Video Library
- Access to curated dog training videos
- Organized by trainers and training levels

### 🐶 Breed Detection via Image Upload
- Upload your pet’s image
- Automatically detect breed using image classification
- Get breed-specific product recommendations

### 🛍️ Smart Pet Product Store
- View and purchase pet food/products
- Products tailored to detected breed (e.g., Husky-specific foods)
- Add to cart, apply promo codes, and checkout

### 🛒 Shopping Cart & Checkout
- Manage cart: edit quantity or remove items
- Checkout with options: Cash on Delivery or Online Payment (via Razorpay)
- Input delivery address and view price summary

### 🛠️ Admin Dashboard
- Admin view of product listings
- Edit product details, prices, or categories
- Manage customer orders

---

## 📸 Screenshots

 ![Screenshot 2025-07-21 183134](https://github.com/user-attachments/assets/642c3f68-25c6-4f79-a661-d3d09eb9df05)
  ![Screenshot 2025-07-21 183146](https://github.com/user-attachments/assets/ce26550a-5d39-4ae7-9181-edde0dc70eda)
  ![Screenshot 2025-07-21 183214](https://github.com/user-attachments/assets/a1165197-8759-4210-8868-de6975edcc12)


 ![Screenshot 2025-07-21 183236](https://github.com/user-attachments/assets/9475121a-d0c8-4bda-9e17-b6d6b4bf4b98)
  ![Screenshot 2025-07-21 183249](https://github.com/user-attachments/assets/83c3de03-33d7-43c1-a950-09049bd642ce)
  ![Screenshot 2025-07-21 183258](https://github.com/user-attachments/assets/67115280-5481-474d-a33d-eae29e77442c)
  ![Screenshot 2025-07-21 183312](https://github.com/user-attachments/assets/7e5ebd1c-d42b-402e-b81c-816c79654f8a)
  ![Screenshot 2025-07-21 183327](https://github.com/user-attachments/assets/c95f158c-2b6b-41ba-bf70-f07412fa8b14)
 

---

## 🚀 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vite/React or similar)
- **Backend:** Node.js / Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment Gateway:** Razorpay
- **AI/ML:** Breed detection using TensorFlow/Keras model (deployed for classification)

---

## 🛠️ Installation & Setup

Follow the steps below to run the full project on your local machine:

### 📁 Folder Structure


### ✅ Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

---

### 🔧  Setup 

```bash
Setup Frontend
cd frontend
npm install
npm run dev

Setup Backend
cd backend
npm install
node server.js

Setup Admin Panel
cd admin
npm install
npm run dev

