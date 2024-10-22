import React from "react"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import ManageBlog from "./pages/ManageBlog";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
// import { userContext } from "./Contexts/userContext";
import userContext from "./Contexts/userContext";
import { useState,useEffect } from "react";
function App() {
  const [user,SetUser] = useState(null);
  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      // Set user to logged in user
      SetUser(JSON.parse(loggedInUser));
    }
    else{
      // If user is not logged in, set user to null
      SetUser(null);
      // Remove user info from local storage
      localStorage.removeItem("user");
    }
  }, []);
  return (
    <>
      <userContext.Provider value={user} >
      <BrowserRouter >
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddBlog />} />
            <Route path="/manage" element={<ManageBlog />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      </userContext.Provider>
    </>
  )
}

export default App
