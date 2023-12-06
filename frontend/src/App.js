import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashbaord";
import Inventory from "./Pages/Inventory";
import Orders from "./Pages/Orders";
// import Protected from "./Components/Protected";
import { AuthContextProvider } from "./context/AuthContext";

import Final from "./final";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}
export default App;
