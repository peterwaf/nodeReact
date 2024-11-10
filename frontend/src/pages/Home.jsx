import React from 'react'
import Header from "../components/partials/Header"
import Footer from "../components/partials/Footer"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

function Home() {
  const [blogItems, setBlogItems] = useState([]);
  console.log(blogItems);
  
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

  // Function to strip HTML tags and limit content to 100 characters
  const getPreview = (content, limit = 650) => {
    const textContent = content.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
    return textContent.length > limit
      ? textContent.substring(0, limit) + "..."
      : textContent;
  };
  
  return (
    <div className="container">
      <Header/>
      <div className="content">
        <h1>The Everyday Chronicles</h1>
        <ul>
          {blogItems.map((blogItem) => {
            return <li key={blogItem.id}>
              <h3>{blogItem.title}</h3>
              <p className="posted-on"> Posted on : {blogItem.createdOn?.toString().substring(0, 10)}</p>
              <img src={blogItem.image || blogItem.featuredImage } alt="" />
               {/*add the html render*/}
              {/* {parse(blogItem.content)} */}
              {/*remove the html render*/}
              {getPreview(blogItem.content)}
              <br />
              <Link className="read-more" to={`/readmore?title=${blogItem.title}&id=${blogItem.id}`}>Read More...</Link>
            </li>
          })}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default Home