import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from "connect-mongo";

const app = express();

// Load environment variables
dotenv.config();

app.set("port", process.env.PORT || 8000);

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  crypto: {
    secret: process.env.CRYPTO_SECRET,
  },
  collectionName: "sessions",
  ttl: 14 * 24 * 60 * 60, //remove after 14 days
  autoRemove: "native", // Optional: How to remove expired sessions ('native' or 'interval')
});

app.use(
  session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(flash());

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import fabricRoutes from "./src/routes/fabricRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import { notFound, errorHandler } from "./src/middlewares/errorMiddleware.js";
import checkoutRoutes from "./src/routes/checkoutRoutes.js";

// Custom middleware to send flash messages
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/fabrics", fabricRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

//Root endpoints
app.get("/", (req, res) => {
  return res.json({ Hello: "World!" });
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const dbURL = process.env.MONGO_URL;

//Start server and connect server
const start = async () => {
  const dbConnection = await mongoose.connect(dbURL);
  console.log(`Successfully Database connected to the server}`);
  app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
  });
};

start();
