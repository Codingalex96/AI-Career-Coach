import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

// ✅ Connect to OpenRouter API
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, 
  baseURL: "https://openrouter.ai/api/v1", 
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173", 
    "X-Title": "AI Career Coach", 
  },
});

// ✅ POST route for AI feedback
router.post("/ai-feedback", async (req, res) => {
  console.log("🟢 Received request to /api/ai-feedback"); 
  try {
  const { resumeText } = req.body;

  const response = await client.chat.completions.create({
    model: "mistralai/mistral-7b-instruct",
    messages: [
      { role: "system", content: "You are a helpful career coach giving resume feedback." },
      { role: "user", content: `Provide detailed, constructive feedback for this resume: ${resumeText}` },
    ],
  });

  // ✅ Defensive extraction
  const feedback =
    response?.choices?.[0]?.message?.content ||
    "No feedback was generated. Please try again.";

  console.log("✅ Feedback generated successfully!");
  res.status(200).json({ feedback });

} catch (error) {
  console.error("❌ Error generating AI feedback:");
  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
  } else {
    console.error(error);
  }
  res.status(500).json({ error: "Failed to generate feedback.", details: error.message });
  }
});

export default router;