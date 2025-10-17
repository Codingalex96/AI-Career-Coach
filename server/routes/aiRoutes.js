import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// POST route for generating feedback
router.post("/ai-feedback", async (req, res) => {
  try {
    const { resumeText } = req.body;

    const response = await client.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", 
      messages: [
        { role: "system", content: "You are a helpful career coach giving resume feedback." },
        { role: "user", content: `Provide feedback for this resume: ${resumeText}` },
      ],
    });

    const feedback = response.choices[0].message.content;
    res.status(200).json({ feedback });
  } catch (error) {
    console.error("Error generating AI feedback:", error);
    res.status(500).json({ error: "Failed to generate feedback." });
  }
});

export default router;