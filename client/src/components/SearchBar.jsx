import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../actions/actions";

export default function SearchBar(){
  const dispatch = useDispatch();
  const [ name, setName ] = useState('')
  

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value)

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountryByName(name))
    
  } 

  return (
    <div>
      <input 
        type='text'
        placeholder='Write the name of a Country'
        onChange={handleInputChange}
      />
      <button type='submit' onClick={handleSubmit}>Search</button>
    </div>
  )
}