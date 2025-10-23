import { useState } from "react";

export default function ResumeForm({ onSubmit }) {
  const [resumeText, setResumeText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeText.trim()) return;
    onSubmit(resumeText);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume here..."
        rows={10}
        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none shadow-sm"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
      >
        Get Feedback
      </button>
    </form>
  );
}
