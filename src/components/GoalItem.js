import React, { useState } from "react";

function GoalItem({ goal, onDelete, onEdit, onDeposit }) {
  const [depositAmount, setDepositAmount] = useState("");

  const progress =
    goal.targetAmount > 0
      ? Math.min(100, ((goal.savedAmount || 0) / goal.targetAmount) * 100)
      : 0;

  const handleDepositSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return;

    const updatedGoal = {
      ...goal,
      savedAmount: (goal.savedAmount || 0) + amount,
    };

    // Send updated data 
    onDeposit(updatedGoal);
    setDepositAmount("");
  };

  return (
    <div className="bg-white shadow p-4 rounded mb-4 border">
      <h3 className="text-lg font-semibold text-gray-800">{goal.name}</h3>
      <p className="text-sm text-gray-600">Category: {goal.category || "N/A"}</p>
      <p className="text-sm">Target: <span className="font-semibold">KES {goal.targetAmount}</span></p>
      <p className="text-sm">Saved: <span className="font-semibold">KES {goal.savedAmount || 0}</span></p>
      <p className="text-sm">Deadline: {goal.deadline}</p>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-1">Progress: {progress.toFixed(1)}%</p>

        {/* Warning if target is reached */}
        {goal.savedAmount >= goal.targetAmount && (
          <p className="text-red-600 text-xs mt-1"> Target achieved or exceeded!</p>
        )}
      </div>

      {/* Deposit Form */}
      <form onSubmit={handleDepositSubmit} className="mt-3 flex gap-2">
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          placeholder="Enter deposit (KES)"
          className="border p-2 w-full rounded text-sm"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
        >
          Deposit
        </button>
      </form>

      {/* Action Button */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(goal)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(goal.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default GoalItem;
