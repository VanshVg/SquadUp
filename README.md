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

- `POST /api/users/registerValidation`: Checks validation for registration.
- `POST /api/users/sendOtp`: Sends otp for email verification.
- `POST /api/users/register`: Registers a new user.
- `POST /api/users/login`: Logsin a new user.
- `GET /api/users/profile`: Shows user's profile.
- `POST /api/users/logout`: Logsout a user.
- `PUT /api/users/updateUsername`: Updates username.
- `DELETE /api/users/setResetPasswordToken`: Sets token for reset password.
- `POST /api/users/verifyEmail`: Verifies an email.
- `POST /api/users/forgotPassword`: Sends forgot password email.
- `POST /api/users/verifyForgotPasswordOtp`: Verifies forgot password otp.
- `POST /api/users/verifyPassword`: Verifies a user password.
- `PUT /api/users/changePassword`: Changes a password.
- `POST /api/users/userValid`: Checks user validity.

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
3. Set up environment variables.
4. Start the server: `npm start`
5. Access the APIs at `http://localhost:4000/api`

## Technologies Used

- Node.js
- React.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
