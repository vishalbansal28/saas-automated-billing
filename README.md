# SaaS Billing Platform

[**Project Image**](https://drive.google.com/file/d/1Sj9znZTGLH7mQFb6p2X1SAVTLH49krWz/view?usp=sharing)

## Overview

This project is a SaaS billing platform that enables users to track usage data, generate invoices, and receive email notifications. The application uses MongoDB for data storage, Google Firebase for authentication, and integrates with Zapier for email notifications.

## Pages

[**Sign In**](https://drive.google.com/file/d/1RInZQryh93Ak4KfTXko3WTPXAJbUcNQT/view?usp=sharing) 

[**Dashboard**](https://drive.google.com/file/d/1nWq2S3YgXRLryBBkITB_qlYaCEuR2zGZ/view?usp=sharing)

[**Orders and Invoice Page**](https://drive.google.com/file/d/1Iuhzd0w4lcXd7n28vjQsy2mitF_g72pA/view?usp=sharing)

[**Your Profile**](https://drive.google.com/file/d/1N8wNhGxcPYz4vJS5fMluxVjOADe1knty/view?usp=sharing)

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Google Firebase
- **Additional Libraries:** Ant Design, Axios, jsPDF

## Deployment Procedure

### Prerequisites

1. Node.js and npm are installed on your machine.
2. MongoDB installed and running.

### Frontend Deployment

**Clone the Repository:**
git clone https://github.com/your-username/billing123.git

**Navigate to the Frontend Directory:**
cd billing123/frontend

**Install Dependencies:**
npm install

**Build the Frontend:**
npm run build

**Serve the Frontend:**
npm install -g serve
serve -s build

**Access the Frontend:**
Open your browser and go to http://localhost:3000.

### Backend Deployment
**Navigate to the Backend Directory:**
cd billing123/backend

**Install Dependencies:**
npm install

**Set Environment Variables:**
Create a .env file in the backend directory.

**Add the following environment variables:**
MONGODB_URI=your_mongodb_connection_string
PORT=5000 # or any desired port

**Run the Backend:**
node app.js

**Access the API:**
The backend API will be accessible at http://localhost:5000.

Note
Ensure that MongoDB is running before starting the backend.
Customize the MongoDB connection string and port as per your requirements.
If deploying in a production environment, consider using process managers like PM2 for the backend.

Please replace `your-username` in the git clone command with your actual GitHub username.



### For any issue please reach out to me @ bvansal.vb@gmail.com or +919057291541

