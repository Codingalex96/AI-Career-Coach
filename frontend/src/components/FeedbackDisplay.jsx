export default function FeedbackDisplay({ feedback }) {
  if (!feedback) return null;

  return (
    <div className="feedback-box">
      <h2>AI Feedback:</h2>
      <p>{feedback}</p>
    </div>
  );
}