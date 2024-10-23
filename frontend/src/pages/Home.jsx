import React from 'react'
import Header from "../components/partials/Header"
import Footer from "../components/partials/Footer"
import axios from 'axios'
import { useState, useEffect } from 'react'
import parse from "html-react-parser"

function Home() {
  const [blogItems, setBlogItems] = useState([]);
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
              <img src={blogItem.image || blogItem.featuredImage } alt="" />
               {/*add the html render*/}
              {/* {parse(blogItem.content)} */}
              {/*remove the html render*/}
              {getPreview(blogItem.content)}
              <br />
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