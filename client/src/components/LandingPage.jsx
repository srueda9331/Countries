import '../styles/Landing.css'
import React from 'react';
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className='landing'>
      <h1 id='title-landing'>Welcome to Countries !</h1>
      <p id='p-landing'>Let's start with countries, the website where you could find info about the countries of the world</p>
      <Link to='./Home' >
        <button id='button-landing'>Go now!</button>
      </Link>
    </div>
  )
}