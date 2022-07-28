import React from "react";

export default function Country({name, image, continent}){

  return (
    <div>
      <h2>{name}</h2>
      <img src={image} alt={name} width='180px' height='135px'/>
      <h3>{continent}</h3>
    </div>
  )
}