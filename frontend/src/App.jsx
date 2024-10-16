import React from "react"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import AddBlog from "./pages/AddBlog"
import ManageBlog from "./pages/ManageBlog"
function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBlog />} />
          <Route path="/manage" element={<ManageBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
