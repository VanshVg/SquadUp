# Team Up Project

Team Up is a web application designed to enhance collaboration and teamwork by providing features for creating, managing, and collaborating within teams. This README provides an overview of the project, its features, and how to get started.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)

## Description

The Team Up project aims to streamline collaboration and task management within teams by offering a set of APIs for backend functionalities. The project provides user authentication, team creation, task management, and more.

## Features

- **User Authentication:**
  - Register new users
  - Log in with existing credentials
  - Log out users

- **User Profile Management:**
  - View and update user profiles
  - Delete user accounts
  - Initiate and verify password resets

- **Team Management:**
  - Create new teams
  - Get a list of teams a user is part of
  - Get detailed information about a team
  - Update and delete team details
  - Join and leave teams

- **Member and Task Management:**
  - View all members in a team
  - Remove members from a team
  - More features related to tasks and communication (work in progress)

## API Endpoints

### User Section

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in with existing user credentials.
- `POST /api/users/logout`: Log out the current user.
- `GET /api/users/profile`: Get the user's profile information.
- `PUT /api/users/updateProfile`: Update user profile details.
- `DELETE /api/users/deleteAccount`: Delete user account.
- `POST /api/users/forgotPassword`: Initiate password reset process.
- `POST /api/users/verifyPassword`: Verify password reset token.
- `POST /api/users/resetPassword`: Reset user password.

### Teams Section

- `POST /api/teams/create`: Create a new team.
- `GET /api/teams/myTeams`: Get a list of teams the user is part of.
- `GET /api/teams/team/:teamCode`: Get detailed information about a team.
- `PUT /api/teams/updateTeam/:teamCode`: Update team details.
- `DELETE /api/teams/deleteTeam/:teamCode`: Delete a team.
- `POST /api/teams/joinTeam/:teamCode`: Join a team.
- `DELETE /api/teams/leaveTeam/:teamCode`: Leave a team.
- `GET /api/teams/:teamCode/showAllMembers`: Get a list of all members in a team.
- `DELETE /api/teams/:teamCode/removeMember/:userId`: Remove a member from a team.

## Getting Started

1. Clone the repository: `git clone https://github.com/VanshVg/TeamUp.git`
2. Install dependencies: `npm install`
3. Set up environment variables (if required).
4. Start the server: `npm start`
5. Access the APIs at `http://localhost:4000/api`

## Technologies Used

- Node.js
- React.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
