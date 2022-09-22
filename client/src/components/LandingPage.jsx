import '../styles/Landing.css'
import React from 'react';
import world from '../images/earth-world-unscreen.gif'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className='landing'>
      <h1 id='title-landing'>Welcome to Countries !</h1>
      <p id='p-landing'>Let's start with countries, the website where you could find info about the countries of the world</p>
      <Link to='./Home' >
        <div className='gif-container'>
          <img src={world} style={{zIndex:100, position:'relative'}}/>
          <div className='gif-text'>Go now!</div>
        </div>
      </Link>
        {/* <button id='button-landing'>Go now!</button> */}
      
    </div>
  )
}