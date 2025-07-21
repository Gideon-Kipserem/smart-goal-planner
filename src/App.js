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

  function handleEditGoal(goalOrUpdatedGoal) {
    if (goalOrUpdatedGoal.targetAmount) {
      setGoals((prevGoals) =>
        prevGoals.map((g) =>
          g.id === goalOrUpdatedGoal.id ? goalOrUpdatedGoal : g
        )
      );
    } else {
      setGoalToEdit(goalOrUpdatedGoal);
    }
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
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Smart Goal Planner</h1>

      <Overview goals={goals} />

      <AddGoalForm onAddGoal={handleAddGoal} />

      {goalToEdit && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateGoal(goalToEdit);
          }}
          className="bg-gray-50 p-4 border rounded mb-6"
        >
          <h2 className="text-lg font-medium mb-3">Edit Goal</h2>
          <input
            className="w-full border p-2 rounded mb-2"
            type="text"
            value={goalToEdit.name}
            onChange={(e) =>
              setGoalToEdit({ ...goalToEdit, name: e.target.value })
            }
            required
          />
          <input
            className="w-full border p-2 rounded mb-2"
            type="number"
            value={goalToEdit.targetAmount}
            onChange={(e) =>
              setGoalToEdit({
                ...goalToEdit,
                targetAmount: parseFloat(e.target.value),
              })
            }
            required
          />
          <input
            className="w-full border p-2 rounded mb-3"
            type="date"
            value={goalToEdit.deadline}
            onChange={(e) =>
              setGoalToEdit({ ...goalToEdit, deadline: e.target.value })
            }
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
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
