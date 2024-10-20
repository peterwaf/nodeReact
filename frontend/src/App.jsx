import React from "react"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import ManageBlog from "./pages/ManageBlog";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBlog />} />
          <Route path="/manage" element={<ManageBlog />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
