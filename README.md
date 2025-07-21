Smart Goal Planner

Overview:
Smart Goal Planner is a personal finance web application built with React and Tailwind CSS. It allows users to set, view, edit, and track their savings goals with target amounts, deadlines, categories, and progress indicators.

Features:

Add a new savings goal with a name, target amount, optional initial deposit, deadline, and category.

Edit and update existing goals.

Delete goals with a single click.

View real-time progress using a visual progress bar and percentage.

Overview section showing total goals, total target amount, and total saved.

Lightweight and minimal Tailwind CSS styling to blend with team standards.

Technologies Used:

React

Tailwind CSS

JSON Server for local API simulation

JavaScript (ES6+)

HTML5

How to Run the App Locally:

Clone the repository and navigate to the project directory.

Run npm install to install dependencies.

Start the mock API server:
npm run server
This starts JSON Server at http://localhost:3001/goals

Start the React app:
npm start
This launches the app at http://localhost:3000

Project Structure:

src/

components/

AddGoalForm.js

GoalList.js

GoalItem.js

Overview.js

App.js

index.js

index.css (Tailwind directives)

Tailwind Setup:
Tailwind was configured using tailwindcss init -p. All classes are directly used in JSX files. The configuration scans all files under src/ for class names.

Notes:

Input validation and fallback handling are included.

Uses controlled components with functional updates for clean state management.

Styling is intentionally subtle to avoid suspicion in team environments.

License:
This project is for learning and internal presentation purposes.