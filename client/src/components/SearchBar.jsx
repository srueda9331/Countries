import '../styles/SearchBar.css'
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryByName } from "../actions/actions";
import swal from 'sweetalert'


export default function SearchBar({setCurrentPage, names}){
  const dispatch = useDispatch();
  const [ name, setName ] = useState('')
  
  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value)
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if(!name){
      swal({
        text: 'Write a name, please !',
        timer: '2500'
      })
    }
    dispatch(getCountryByName(name))
    setCurrentPage(1)
  } 

 return (
    <div>
      <input 
        id='input-search'
        type='text'
        placeholder='Write the name of a Country'
        onChange={(e) => handleInputChange(e)}
      />
      <button id='button-search' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
    </div> 
 )

}