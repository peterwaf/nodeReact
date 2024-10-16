import React from 'react'
import { Link } from "react-router-dom"
function Header() {
  return (
    <nav>
        <ul>
            <li><a href="/#">Home</a></li>
            <li><a href="/#">About</a></li>
            <li><Link to="/add">Add Blog</Link></li>
            <li><Link to="/manage">Manage Blog</Link></li>
        </ul>
    </nav>
  )
}

export default Header