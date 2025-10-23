import { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import FeedbackDisplay from "./components/FeedbackDisplay";
import { getAIFeedback } from "./api/aiApi";

export default function App() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (resumeText) => {
    setLoading(true);
    const aiFeedback = await getAIFeedback(resumeText);
    setFeedback(aiFeedback);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        AI Resume Assistant
      </h1>
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        <ResumeForm onSubmit={handleSubmit} />
        {loading ? (
          <p className="mt-4 text-gray-600 italic">Generating feedback...</p>
        ) : (
          <FeedbackDisplay feedback={feedback} />
        )}
      </div>
    </div>
  );
}
