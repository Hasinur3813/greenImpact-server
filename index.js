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

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5000"],
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

// middleware to handle 404 error
app.use(noRouteFound);

// middleware for global error handling
app.use(globalErrorHandle);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
