import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between bg-gray-200 w-full p-4">
      <h1
        className="text-center text-2xl font-bold"
        style={{ color: "white", fontSize: "50px" }}
      >
        User Billing & Invoice Generator Dashboard
      </h1>
      <h1 className="text-center text-2xl font-bold">
        {user?.displayName ? (
          <button onClick={handleSignOut}>Logout</button>
        ) : (
          <Link to="/signin" style={{ color: "white" }}>
            Sign in
          </Link>
        )}
      </h1>
    </div>
  );
};

export default Navbar;
