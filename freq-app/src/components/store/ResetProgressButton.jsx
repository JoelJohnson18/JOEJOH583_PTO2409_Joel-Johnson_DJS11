import React from "react";
import { resetListeningProgress } from "../../data/resetProgress"; // Cleared stored listening progress data //
import "./ResetProgressButton.css"; // for custom styling

export default function ResetProgressButton({ onReset }) { // Button to reset all listening progress //
  const handleReset = () => {
    // User confirmation prompt //
    const confirmReset = window.confirm(
      "Are you sure you want to reset all your listening progress? This cannot be undone."
    );
    if (confirmReset) {
      // reset stored listening data //
      const cleared = resetListeningProgress();
      onReset?.(); // trigger UI refresh
      alert(`✅ Listening history reset. ${cleared} episodes unmarked.`);
    }
  };

  // Button triggers handleReset when clicked //
  return (
    <button className="reset-progress-button" onClick={handleReset}>
      🔄 Reset Listening History
    </button>
  );
}
