import React from "react"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import ManageBlog from "./pages/ManageBlog";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UpdateUser from "./pages/UpdateUser";
// import userContext from "./Contexts/userContext";
import userContext from "./Contexts/userContext";
import About from "./pages/About";
import Terms from "./pages/Terms";
import { useState, useEffect } from "react";
import ReadMore from "./pages/ReadMore";
import { auth } from "../cred";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const [user, setUser] = useState(null);

  // Reset user on logout
  const resetUser = () => {
    setUser(null);
  }
  // Check if user is logged in on page load
  const setUpUser = () => {
    try {
      // Check if user is logged in
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        }
        else {
          setUser(null);
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setUpUser();
  }, []);

  return (
    <>
      {/* user contect provider to share user state between pages */}
      <userContext.Provider value={{ user, resetUser, setUpUser }} >
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={"/add"} element={<AddBlog />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/manage"} element={<ManageBlog />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/readmore" element={<ReadMore />} />
            <Route path="/update-user-role" element={<UpdateUser />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  )
}

export default App
