import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext  from "../../Contexts/userContext.jsx";

function Header() {
  const navigate = useNavigate();
  const {user,resetUser} = useContext(userContext);
  const LogOut = async () => {
    try {
      await axios.get("http://localhost:3000/logout");
      localStorage.removeItem("user");
      navigate("/");
      resetUser();
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(user);
  
  return (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li style={{display: !user&&"none"}}>{user&&<Link to="/add" className="admin-link">Add Blog</Link>}</li>
            <li style={{display: !user&& "none"}} >{user&&<Link to="/manage" className="admin-link">Manage Blog</Link>}</li>
            <li>{user ? <Link onClick={() => LogOut()} className="admin-link">LogOut</Link> : <Link to="/login" className="admin-link">Login</Link>}</li>
        </ul>
    </nav>
  )
}

export default Header