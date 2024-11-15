import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import userContext from "../../Contexts/userContext.jsx"
import { auth } from "../../../cred.js";

function Header() {
  const navigate = useNavigate();
  const { user,resetUser,isAdmin,resetAdmin, checkisAdminRole } = useContext(userContext);

  const LogOut = async () => {
    try {
      await signOut(auth); // Correct usage of signOut
      navigate("/");
      resetUser();
      resetAdmin();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li style={{ display: !isAdmin && "none" }}>
          {isAdmin && <Link to="/update-user-role" className="admin-link">Update User Role</Link>}
        </li>
        <li style={{ display: !isAdmin && "none" }}>
          {isAdmin && <Link to="/add" className="admin-link">Add Blog</Link>}
        </li>
        <li style={{ display: !isAdmin && "none" }}>
          {isAdmin && <Link to="/manage" className="admin-link">Manage Blog</Link>}
        </li>
        <li>
          {user 
            ? <Link onClick={LogOut} className="admin-link">LogOut</Link> 
            : <Link to="/login" className="admin-link">Login</Link>}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
