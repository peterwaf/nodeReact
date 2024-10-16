import React from 'react'

function Footer() {
  return (
    <div className="footer">
      <p>&copy; {new Date().getFullYear().toString()}</p>
    </div>
  )
}

export default Footer