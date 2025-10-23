import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

// ✅ Allow frontend (Vite) to access backend
app.use(cors({
  origin: "http://localhost:5173", // frontend's URL
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/api", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));