import axios from "axios";

export const getAIFeedback = async (resumeText) => {
  try {
    const response = await axios.post("http://localhost:5000/api/ai-feedback", { resumeText });
    return response.data.feedback;
  } catch (error) {
    console.error("Error fetching AI feedback:", error);
    return "Failed to get AI feedback. Try again.";
  }
};