import React from 'react'
import Header from "../components/partials/Header"
import Footer from "../components/partials/Footer"
function About() {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <h1>About</h1>
        <p>Welcome to The Everyday Chronicles, a blog dedicated to sharing fresh perspectives on life, personal growth, and the world around us. What began as a small passion project has grown into a vibrant community of curious minds who thrive on inspiration and thoughtful conversations.</p>
        <p>Our diverse team of writers covers topics ranging from wellness and lifestyle to travel and current events, always aiming to provide content that informs and inspires. We believe in the power of storytelling and encourage our readers to engage, share, and connect with one another.</p>
        <p>Thank you for joining us on this journey!</p>
      </div>
      <Footer />
    </div>
  )
}

export default About