# Task Management App

## Description

The **Task Management App** is a full-stack web application built using MongoDB for the unstructured and the complicated data, and mySql for the structured data, ExpressJS, ReactJS, and Node.js. It allows users to manage tasks efficiently by creating, updating, and deleting tasks. The app also includes features like task status(To Do, pending or completed) , add a task attachment, due dates, and user authentication.

## Installation Guide

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v12 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud-hosted MongoDB)
- **mySql** (or [XAMPP](https://www.apachefriends.org) for a local development environment)

### Steps to Install and Run the App Locally

1. **Clone the Repository**:
   Clone the project to your local machine using Git:
   ```bash
   git clone https://github.com/djaffergithubit/task-management-app.git
   cd task-management-app

2. Install Backend Dependencies:
    ```bash
    cd server
    npm install

3. install frontend dependencies:
    ```bash
    cd client
    npm install

4. Set Up Environment Variables
    ```bash
    MONGO_URL= your_mongodb_connection_string
    SECRET_TOKEN= your_jwt_secret_key
    PORT=Port

5. Run the Backend Server:
    ```bash
    cd server
    npm run dev

6. run the frontend app:
    ```bash
    cd client
    npm run dev