import '../styles/SearchBar.css'
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryByName } from "../actions/actions";

export default function SearchBar(){
  const dispatch = useDispatch();
  const [ name, setName ] = useState('')
  // const oneCountry = useSelector(state => state.countries)
  // const find = oneCountry.filter(n => n.name)
  // var other = find.filter(c => c.name === name)
  // console.log(other[0]);



  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value)
   
   
  }

  async function handleSubmit(e) {
    e.preventDefault();
   
      let d = await dispatch(getCountryByName(name))
  
      if(!name){
        alert('Write a name')
      }
      if(name) {var found = name.toLocaleLowerCase()}
      if(!/[a | e | i | o | u | r | t | z | b | y | n | s | m | d | l | h | d | c | k | g ][a | e | i |o | u | w | s| r | d| l | p | c | b | t | n][a | e | i | o | u | n | l | d | t | s | q | y | m | k]+$/.test(found)){
        alert("Sorry, cannot find your country")
      }
 
  } 

 return (
    <div>
      <input 
        type='text'
        placeholder='Write the name of a Country'
        onChange={(e) => handleInputChange(e)}
      />
      <button id='button-search' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
    </div> 
 )

}