import React, { useState } from "react";

function AddGoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
    savedAmount: "",
  });

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

    if (
      formData.name.trim() === "" ||
      !formData.targetAmount ||
      !formData.deadline
    ) {
      alert("Please fill all required fields!");
      return;
    }

    const newGoal = {
      ...formData,
      savedAmount: formData.savedAmount || 0,
    };

    fetch("http://localhost:3001/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddGoal(data);
        setFormData({
          name: "",
          targetAmount: "",
          deadline: "",
          savedAmount: "",
        });
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 rounded mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>

      <input
        type="text"
        name="name"
        placeholder="Goal name"
        className="block w-full border p-2 mb-3"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="targetAmount"
        placeholder="Target amount (KES)"
        className="block w-full border p-2 mb-3"
        value={Number.isNaN(formData.targetAmount) ? "" : formData.targetAmount}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="savedAmount"
        placeholder="Optional: Initial deposit (KES)"
        className="block w-full border p-2 mb-3"
        value={Number.isNaN(formData.savedAmount) ? "" : formData.savedAmount}
        onChange={handleChange}
      />

      <input
        type="date"
        name="deadline"
        className="block w-full border p-2 mb-4"
        value={formData.deadline}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Goal
      </button>
    </form>
  );
}

export default AddGoalForm;
