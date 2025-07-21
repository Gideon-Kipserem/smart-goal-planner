import React, { useEffect, useState } from "react";
import AddGoalForm from "./components/AddGoalForm";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";

function App() {
  const [goals, setGoals] = useState([]);
  const [goalToEdit, setGoalToEdit] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => {
        console.error("Error fetching goals:", err);
        setGoals([]);
      });
  }, []);

  function handleAddGoal(newGoal) {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  }

  function handleDeleteGoal(goalId) {
    fetch(`http://localhost:3001/goals/${goalId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
      }
    });
  }

  function handleEditGoal(goal) {
    setGoalToEdit(goal);
  }

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
        setGoals((prevGoals) =>
          prevGoals.map((goal) => (goal.id === data.id ? data : goal))
        );
        setGoalToEdit(null);
      });
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Smart Goal Planner</h1>

      <Overview goals={goals} />
      <AddGoalForm onAddGoal={handleAddGoal} />

      {goalToEdit && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              goalToEdit.name.trim() === "" ||
              !goalToEdit.targetAmount ||
              !goalToEdit.deadline
            ) {
              alert("Please fill all required fields.");
              return;
            }
            handleUpdateGoal(goalToEdit);
          }}
          className="bg-gray-100 p-4 rounded mb-4"
        >
          <h2 className="text-lg font-bold mb-2">Edit Goal</h2>

          <input
            className="block mb-2 w-full border p-2"
            type="text"
            value={goalToEdit.name || ""}
            onChange={(e) =>
              setGoalToEdit({ ...goalToEdit, name: e.target.value })
            }
            required
          />

          <input
            className="block mb-2 w-full border p-2"
            type="number"
            value={
              Number.isNaN(goalToEdit.targetAmount)
                ? ""
                : goalToEdit.targetAmount
            }
            onChange={(e) =>
              setGoalToEdit({
                ...goalToEdit,
                targetAmount: parseFloat(e.target.value),
              })
            }
            required
          />

          <input
            className="block mb-2 w-full border p-2"
            type="date"
            value={goalToEdit.deadline || ""}
            onChange={(e) =>
              setGoalToEdit({ ...goalToEdit, deadline: e.target.value })
            }
            required
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            type="submit"
          >
            Update Goal
          </button>
        </form>
      )}

      <GoalList
        goals={goals}
        onDelete={handleDeleteGoal}
        onEdit={handleEditGoal}
      />
    </div>
  );
}

export default App;
