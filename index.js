import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./src/config/db.js";
import globalErrorHandle from "./src/middlewares/globalErrorHandle.js";
import noRouteFound from "./src/middlewares/noRouteFound.js";
import eventRoute from "./src/routes/eventRoute.js";
import authRoute from "./src/routes/authRoute.js";
import donationRoute from "./src/routes/donationRoute.js";
import adminRoute from "./src/routes/adminRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://greenimpact-gamma.vercel.app"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to GreenImpact API!");
});

app.use("/api", eventRoute);
app.use("/api/auth", authRoute);
app.use("/api/donation", donationRoute);
app.use("/api/admin", adminRoute);

// middleware to handle 404 error
app.use(noRouteFound);

// middleware for global error handling
app.use(globalErrorHandle);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
