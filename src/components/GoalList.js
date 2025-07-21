
import React from "react";
import GoalItem from "./GoalItem";

function GoalList({ goals, onDelete, onEdit, onDeposit }) {
  return (
    <div className="space-y-4">
      {goals.map((g) => (
        <GoalItem
          key={g.id}
          goal={g}
          onDelete={onDelete}
          onEdit={onEdit}
          onDeposit={onDeposit}
        />
      ))}
    </div>
  );
}

export default GoalList;
