// Signin.jsx

import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Import the styles

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div className="signin-container">
      <Navbar />
      <div className="signin-content">
        {/* <h1 className="text-center text-3xl font-bold py-8">Sign in</h1> */}
        <div className="signin-button-container">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default Signin;
