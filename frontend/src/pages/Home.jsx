import React from 'react'
import Header from "../components/partials/Header"
import Footer from "../components/partials/Footer"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useContext } from "react"
import userContext from "../Contexts/userContext"
function Home() {
  const [blogItems, setBlogItems] = useState([]);
  const  user = useContext(userContext);
 
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/");
        setBlogItems(res.data.blogs);
      } catch (error) {
        console.log(error.message);

      }
    }
    getData();
  }, []);
  console.log(user);
  return (
    <div className="container">
      <Header />
      <div className="content">
        <h1>Welcome to our blog</h1>
        <ul>
          {blogItems.map((blogItem) => {
            return <li key={blogItem.id}>
              <h3>{blogItem.title}</h3>
              <img src={blogItem.image || blogItem.featuredImage } alt="" />
              <p>{blogItem.content.substring(0, 450) || blogItem.body.substring(0, 10)}</p>
              <a className="read-more" href="#">Read More...</a>
            </li>
          })}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default Home