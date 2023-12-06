// Home.jsx
import React from "react";
import Navbar from "../Components/Navbar";
import "./styles.css"; // Import the styles

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1 className="text-center text-3xl font-bold py-8" style={{ marginTop: "-10px" }}>
          Welcome to Our SaaS Billing Platform
        </h1>
        <p className="text-center text-lg mb-8">
          Transforming your billing process with seamless automation and innovative solutions.
        </p>
        <div className="feature-section">
          <div className="feature-item">
            <h2 className="text-2xl font-bold mb-4">Billing Automation</h2>
            <p>
              Automate your billing process based on usage data, saving time and reducing errors.
            </p>
          </div>
          {/* <div className="feature-item">
            <h2 className="text-2xl font-bold mb-4">Invoice Management</h2>
            <p>
              Effortlessly manage your invoices and keep track of financial transactions.
            </p>
          </div> */}
          <div className="feature-item">
            <h2 className="text-2xl font-bold mb-4">User-Friendly Interface</h2>
            <p>
              Enjoy a user-friendly interface designed to enhance your overall experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
