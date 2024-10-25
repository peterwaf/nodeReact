import React from 'react'
import Header from "../components/partials/Header"
import Footer from "../components/partials/Footer"
import axios from 'axios'
import { useState, useEffect } from 'react'
import parse from "html-react-parser"

function ReadMore() {

 const [blogItem, setBlogItem] = useState({
   title: "",
   image: "",
   content: ""
 });

  useEffect(() => {
    const getData = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("id");
        const res = await axios.get(`http://localhost:3000/readmore?id=${id}`);
        setBlogItem(res.data.blog);
      } catch (error) {
        console.log(error.message);
      }
    }
    getData();
  }, []);
  
  return (
    <div className="container">
      <Header/>
      <div className="inner-content">
        <h1>{blogItem?.title}</h1>
        <p>Posted on : {blogItem.createdOn?.toString().substring(0, 10)}</p>
        <img className="blog-content-image" src={blogItem?.image} alt="" />
        {/* Parse the content with html-react-parse
        to render it as HTML */}
        {parse(blogItem?.content)}
      </div>
      <Footer />
    </div>
  )
}

export default ReadMore