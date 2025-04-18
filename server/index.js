import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", UserRoutes);


app.use(cors({
    origin: "http://localhost:3000", // allow your frontend
    credentials: true
  }));

// Error handler (no changes needed here)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });
  

app.get("/", async (req, res) => {
    // ... (your route handler)
});

const connectDB = async () => { // Add async keyword
    mongoose.set("strictQuery", true);
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Mongo DB");
    } catch (error) {
        console.error("failed to connect with mongo");
        console.error(error); // Log the full error object for debugging
        throw error; // Re-throw the error to prevent server start
    }
};

const startServer = async () => {
    try {
        await connectDB(); // Await the database connection
        app.listen(8080, () => console.log("Server started on port 8080"));
    } catch (error) {
        console.error("Server startup failed:", error);
    }
};

startServer();