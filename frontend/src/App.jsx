import React from "react"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import ManageBlog from "./pages/ManageBlog";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import userContext from "./Contexts/userContext";
import { useState,useEffect } from "react";
function App() {
  const [user,SetUser] = useState(null);
  
  // Reset user on logout
  const resetUser = () => {
    SetUser(null);
  }
  // Check if user is logged in on page load
  const setUpUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      SetUser(JSON.parse(user));
    }
  }

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      SetUser(JSON.parse(user));
    }
  }, []);

  return (
    <>
      <userContext.Provider value={{user,resetUser,setUpUser}} >
      <BrowserRouter >
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path={"/add"} element={<AddBlog />} />
            <Route path={"/manage"} element={<ManageBlog />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      </userContext.Provider>
    </>
  )
}

export default App
