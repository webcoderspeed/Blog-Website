import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <h1>The Dojo Blog</h1>
            <div className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/create" style={{
                    color:'white',
                    backgroundColor:'#f2356d',
                    borderRadius:'8px'
                }}>New Blog</NavLink>
            </div>
        </div>
    )
}

export default Navbar
