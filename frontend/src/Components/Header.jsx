import React from 'react'
import { NavLink } from 'react-router-dom'
import NileitLogo from '../assets/NileitLogo.jpg'
import Navbar from './Navbar'
import '../css/Header.css'


const Header = ({isLoggedIn}) => {

  return (

   <header>
   
        <NavLink to='/'>
            <img className="mainLogo" src={NileitLogo} alt='logo '/>
        </NavLink>
         
        <Navbar/>
   </header>
  )
}

export default Header