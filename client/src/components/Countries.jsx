import React from "react";

export default function Country({name, image, continent, activities }){

  return (
    <div>
      <h2>{name}</h2>
      <img src={image} alt={name} width='180px' height='135px'/>
      <h3>{continent}</h3>
      
      {
        activities.length > 0? activities.map(el => <span>{el.name + ', '}</span>) : null
      }
  
    </div>
  )
}