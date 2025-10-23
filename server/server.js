import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());


app.use("/api", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));