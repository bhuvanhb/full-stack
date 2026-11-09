import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import issueRoutes from "./routes/issueRoutes.js";

dotenv.config({ path: "server/.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        message: "Smart Campus Backend is running!"
    });
});

app.use("/api/issues", issueRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.log("MongoDB connection failed:", error.message);
    });