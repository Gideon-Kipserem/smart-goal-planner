import React, { useEffect, useState } from "react";
import AddGoalForm from "./components/AddGoalForm";
import GoalList from "./components/GoalList";

function App() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  // Fetch goals on load
  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then(setGoals)
      .catch((err) => console.error("Failed to load goals:", err));
  }, []);

  // Add new goal
  function handleAddGoal(newGoal) {
    setGoals((prev) => [...prev, newGoal]);
  }

  // Delete goal
  function handleDeleteGoal(id) {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: "DELETE",
    }).then(() => {
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    });
  }

  // Begin editing a goal
  function handleEditGoal(goal) {
    setEditingGoal(goal);
  }

  // Update goal after editing
  function handleUpdateGoal(updatedGoal) {
    fetch(`http://localhost:3001/goals/${updatedGoal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals((prev) =>
          prev.map((g) => (g.id === data.id ? data : g))
        );
        setEditingGoal(null);
      });
  }

  // Deposit funds into a goal
  function handleDeposit(updatedGoal) {
    handleUpdateGoal(updatedGoal);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <AddGoalForm
        onAddGoal={handleAddGoal}
        editingGoal={editingGoal}
        onUpdateGoal={handleUpdateGoal}
        cancelEdit={() => setEditingGoal(null)}
      />

      <h2 className="text-xl font-semibold mb-4">Your Goals</h2>
      <GoalList
        goals={goals}
        onDelete={handleDeleteGoal}
        onEdit={handleEditGoal}
        onDeposit={handleDeposit}
      />
    </div>
  );
}

export default App;
