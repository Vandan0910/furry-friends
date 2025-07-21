import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js"; // ✅ Order Routes
import appointmentRouter from "./routes/appointmentsRoute.js";
import detectBreedRouter from "./routes/detectBreedRouter.js";
import dotenv from "dotenv";

dotenv.config();

// Debugging logs
console.log("🔹 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("🔹 RAZORPAY_SECRET_KEY:", process.env.RAZORPAY_SECRET_KEY ? "Loaded" : "Not Loaded");
console.log("🔹 PORT:", process.env.PORT || 4000);

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();

// API Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/detect", detectBreedRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("✅ API is working!");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
