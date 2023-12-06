# SaaS Billing Platform

![Project Image](https://drive.google.com/file/d/18TeR2IMH8TpI0XzBab4Mee8iGQgIHZh1/view?usp=drive_link)

## Overview

This project is a SaaS billing platform that enables users to track usage data, generate invoices, and receive email notifications. The application uses MongoDB for data storage, Google Firebase for authentication, and integrates with Zapier for email notifications.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Google Firebase
- **Additional Libraries:** Ant Design, Axios, jsPDF

## Deployment Procedure

### Prerequisites

1. Node.js and npm installed on your machine.
2. MongoDB installed and running.

### Frontend Deployment

**Clone the Repository:**
git clone https://github.com/your-username/billing123.git

Navigate to the Frontend Directory:
cd billing123/frontend
Install Dependencies:
npm install

Build the Frontend:
npm run build

Serve the Frontend:
npm install -g serve
serve -s build

Access the Frontend:
Open your browser and go to http://localhost:5000.

### Backend Deployment
Navigate to the Backend Directory:
cd billing123/backend

Install Dependencies:
npm install

Set Environment Variables:
Create a .env file in the backend directory.

Add the following environment variables:
MONGODB_URI=your_mongodb_connection_string
PORT=5000 # or any desired port

Run the Backend:
node app.js

Access the API:
The backend API will be accessible at http://localhost:5000.

Note
Ensure that MongoDB is running before starting the backend.
Customize the MongoDB connection string and port as per your requirements.
If deploying in a production environment, consider using process managers like PM2 for the backend.

Please replace `your-username` in the git clone command with your actual GitHub username.





