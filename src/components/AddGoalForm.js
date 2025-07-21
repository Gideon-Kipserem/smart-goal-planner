import React, { useEffect, useState } from "react";

function AddGoalForm({ onAddGoal, editingGoal, onUpdateGoal, cancelEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
    savedAmount: 0,
  });

  useEffect(() => {
    if (editingGoal) {
      setFormData(editingGoal);
    }
  }, [editingGoal]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "targetAmount" || name === "savedAmount"
          ? parseFloat(value)
          : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const goalToSubmit = {
      ...formData,
      savedAmount: formData.savedAmount || 0,
    };

    if (editingGoal) {
      onUpdateGoal(goalToSubmit);
    } else {
      fetch("https://server-31wa.onrender.com/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goalToSubmit),
      })
        .then((res) => res.json())
        .then((data) => {
          onAddGoal(data);
        });
    }

    setFormData({
      name: "",
      targetAmount: "",
      deadline: "",
      savedAmount: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-4 rounded mb-6">
      <h2 className="text-lg font-medium mb-3">
        {editingGoal ? "Edit Goal" : "Add New Goal"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Goal name"
        className="w-full border p-2 rounded mb-3"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="targetAmount"
        placeholder="Target amount (KES)"
        className="w-full border p-2 rounded mb-3"
        value={formData.targetAmount}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="savedAmount"
        placeholder="Optional: Initial deposit (KES)"
        className="w-full border p-2 rounded mb-3"
        value={formData.savedAmount}
        onChange={handleChange}
      />

      <input
        type="date"
        name="deadline"
        className="w-full border p-2 rounded mb-4"
        value={formData.deadline}
        onChange={handleChange}
        required
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editingGoal ? "Update Goal" : "Add Goal"}
        </button>

        {editingGoal && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddGoalForm;
