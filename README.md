Task Manager – A Basic Full-Stack Web Application

Project Overview

Task Manager is a simple full-stack web application that helps users manage their daily tasks. Users can add, view, and delete tasks.

Technologies Used

* Frontend: React.js, JavaScript, HTML, CSS
* Backend: Node.js and Express.js
* Communication: REST APIs
* Version Control: Git and GitHub

Features

1. Add new tasks.
2. View all tasks.
3. Delete tasks.
4. Validate empty task titles.

How It Works

The React frontend communicates with the Express backend using REST APIs and the Fetch API. The backend processes requests and sends JSON responses to the frontend.

API Endpoints

Method	Endpoint	Purpose
GET	/api/tasks	View tasks
POST	/api/tasks	Add a task
DELETE	/api/tasks/:id	Delete a task

How to Run

Backend

Open a terminal in the project folder and run:

cd backend
npm install
node server.js

Backend URL: http://localhost:5000

Frontend

Open another terminal in the project folder and run:

cd frontend
npm install
npm run dev

Open the local URL displayed in the terminal.

Note

Tasks are stored in backend memory and will be cleared when the backend server restarts. Database integration can be added in the future.