# Enrollment Management Front-end

## Overview

This is the front-end of the enrollment tracking system, built with React.js and TypeScript. It allows users to manage courses, students, and enrollments through an intuitive web interface. The application communicates with a back-end API built with .NET 8 and Entity Framework Core.

## Technologies Used

- React.js
- TypeScript
- Vite
- React Router
- Material UI (MUI)
- Axios (for API requests)

## Installation and Configuration

### 1. Clone the Repository

```sh
git clone <REPOSITORY_URL>
cd frontend
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Run the Application

```sh
npm run dev
```

The front-end will run on `http://localhost:5173` or `http://localhost:5174`, depending on the available port.

## Connecting with the API

The front-end communicates with a back-end API developed using **.NET 8** and **Entity Framework Core**. The API is responsible for handling course, student, and enrollment management.

- Repository: [https://github.com/elianfloresp/enrollment-management-api](<REPO_URL>)
- Default API URL: `http://localhost:5288` (check API settings for the correct port)
- Ensure CORS settings allow requests from the front-end.

## Features

- **Courses Management**: Create, list, edit, and delete courses.
- **Students Management**: Register, list, edit, and delete students (must be 18 years or older).
- **Enrollments Management**: Enroll students in courses and remove them when necessary.
- **Filtering and Listing**: View all courses, students, and students enrolled in specific courses.

## Folder Structure

```
frontend/
│── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Main application pages
│   ├── services/        # API request handling (Axios)
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # Global styles and themes
│   ├── App.tsx          # Main application file
│   ├── main.tsx         # Entry point
│── public/              # Static assets
│── package.json         # Project dependencies
```

## Final Considerations

- The front-end follows best practices with React and Material UI.
- The application is structured to ensure maintainability and scalability.
- The README provides all necessary instructions for running and testing the project.
- The back-end is developed using .NET 8 with Entity Framework Core and an SQLite database for data persistence.

