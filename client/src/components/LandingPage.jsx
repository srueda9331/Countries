import React from 'react';
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div>
      <h1>Countries</h1>
      <p>Let's start with countries, the website where you could find info about the countries of the world</p>
      <Link to='./Home.jsx' >
        <button className='button-landing'>Go now!</button>
      </Link>
    </div>
  )
}