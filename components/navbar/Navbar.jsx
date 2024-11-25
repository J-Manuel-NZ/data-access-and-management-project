import React from 'react'
import './navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar_search-bar'>
        <input type="text" />
        <button>Search</button>
      </div>
      <div className="login">
        <button>Login as Student</button>
        <button>Login as Admin</button>
        <button>Login as Teacher</button>
      </div>
    </div>
  )
}

export default Navbar
