# Smart Goal Planner

A React-based application to help users create, manage, and track their savings goals. Users can add goals, edit or delete them, deposit funds, and view overall progress.

## Features

- Add new goals with name, target amount, deadline, and category
- Edit and delete existing goals
- Deposit funds toward goals and track progress
- View total goals, total saved amount, and total target amount in the overview
- Responsive and clean interface styled with Tailwind CSS
- Uses json-server for persistent data

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- json-server (installed globally or locally)

### Installation

1. Clone the repository:
   git clone https://github.com/your-username/smart-goal-planner.git
   cd smart-goal-planner

2. Install dependencies:
   npm install

3. Start the mock API server:
   npx json-server --watch db.json --port 3001

4. Start the React development server:
   npm start

The app will be available at http://localhost:3000 and will fetch data from http://localhost:3001/goals.

## Project Structure

src/
├── App.js
├── components/
│   ├── AddGoalForm.js
│   ├── GoalItem.js
│   ├── GoalList.js
│   └── Overview.js
├── index.js
└── index.css

## Technologies Used

- React (with useState and useEffect hooks)
- Tailwind CSS
- json-server for mock backend
- JavaScript (ES6)

## Potential Improvements

- Add filtering and search functionality
- Add goal categories and sorting
- Add authentication to support multiple users
- Mobile-first layout and UI polish

## Author

- GitHub: https://github.com/Gideon-Kipserem
