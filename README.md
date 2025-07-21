# Smart Goal Planner

Smart Goal Planner is a simple savings goal management app built with React and JSON Server. It allows users to:

- View, create, edit, and delete savings goals
- Track progress towards a target amount
- Deposit money to each goal
- Categorize goals and view deadlines
- Get an overview of total savings and targets

---

## Features

- CRUD Functionality: Add, update, and delete goals
- Progress Bar: Visual feedback on savings progress
- Deposit System: Add funds to each goal
- Overview Section: Total number of goals, total saved, and target sum
- Edit Mode: Reuse the form to update an existing goal
- Clean UI: Styled using Tailwind CSS

---
## Live link

This app is live on

### Live Backend

The backend is deployed on Render at:

https://server-31wa.onrender.com

All frontend API requests should point to this base URL. For example:

fetch("https://server-31wa.onrender.com/goals")

---


## Technologies Used

- React
- JSON Server
- Tailwind CSS
- Render (Backend deployment)

---

## Getting Started Locally

### Backend Setup

1. Clone the repo:
  

2. Install dependencies:
   npm install

3. Run JSON Server:
   npx json-server --watch db.json --port 3001

### Frontend Setup

1. Navigate to the frontend directory:
   cd smartGoalPlanner-frontend

2. Install dependencies:
   npm install

3. Start the app:
   npm start

---

## Deployment



## Future Improvements

- Add user authentication
- Add categories filtering
- Improve mobile responsiveness
- Display goal completion history



## License

This project is licensed for educational use during the Phase 2 code challenge.

## Author

This project was created  by Gideon Kimaiyo.