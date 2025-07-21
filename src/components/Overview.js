// src/components/Overview.js
import React from "react";

function Overview({ goals }) {
  const totalTargets = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + (g.savedAmount || 0), 0);
  return (
    <div className="bg-blue-100 rounded p-4 mb-6">
      <p className="font-semibold">Total Goals: {goals.length}</p>
      <p>Total Saved: KES {totalSaved.toLocaleString()}</p>
      <p>Total Targets: KES {totalTargets.toLocaleString()}</p>
    </div>
  );
}

export default Overview;
