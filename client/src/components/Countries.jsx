import '../styles/Countries.css'
import React from "react";

export default function Country({name, image, continent, activities }){

  return (
    <div className='country-container'>
      <h2 className='name-country'>
        {
          name.length > 15? name[0].toUpperCase() + name.slice(1,15) + ' ...' : name[0].toUpperCase() + name.slice(1,15)
        }
      </h2>
      <img className='img-country' src={image} alt={name} width='180px' height='135px'/>
      <h3 className='name-continent'>{continent}</h3>
      
      {
        activities.length === 1? <span className='activity-name'><b>Activity: &nbsp;&nbsp;</b></span> : null
      }
      {
        activities.length > 1? <span className='activity-name'><b>Activities: &nbsp;&nbsp;</b></span> : null
      }
      {
        activities.length === 1?  activities.map(el => <span className='activity-name'>{ el.name[0].toUpperCase() + el.name.slice(1).toLowerCase() + ' '}</span>) : null
      }
      {
        activities.length > 1?  activities.map(el => <span className='activity-name'>{  '• ' + el.name[0].toUpperCase() + el.name.slice(1).toLowerCase()} &nbsp;&nbsp;&nbsp;</span>) : null
      }
  
    </div>
  )
}