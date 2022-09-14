import '../styles/CreateActivity.css'
import React, {useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {  getActivitiesNames, getCountryNames, postActivity } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";



export default function CreateActivity(){
  const dispatch = useDispatch();
  const history = useHistory();
  const activityOne = useSelector(state => state.activities)
  const countryNames = useSelector(state => state.getNames);
  const [ errors, setErrors ] =useState({})

  function validate(input){
    let errors = {}
   
    if(!input.name) errors.name = 'Please, write the name of an activity';
    else if(input.name.length < 3) errors.name = 'The name of the activity is to short at least 3 characteres'
    else if(!/^[a-zA-z]+$/.test(input.name)) errors.name = 'Write only letters of the activity or sport'
    else if(input.name.length > 12) errors.name = 'The name of the activity should not surpass 12 characteres'
    else if(activityOne.includes(input.name.toLowerCase())) errors.name = 'The name already exits';
    if(!input.difficulty) errors.difficulty = 'Please set a number between 1 and 5, where 1 is the easiest and 5 the most difficult'
    else if(input.difficulty < 1 || input.difficulty > 5 ) errors.difficulty = 'Write only one in the range (1,2,3,4,5)'
    if(!input.duration) errors.duration = 'Set for how much time the activity is going to last'
    else if(!/^[0-9][0-9]?\s[a-z]+[s | h | r | k | y]$/.test(input.length)) errors.length = 'Write something like a number of one or two digits, space and day, week, month in singular or plural'
    // if(countryNames.includes(input.countriesOne).length > 0){
    //   errors.countriesOne = 'It cannot repeat the same country' 
    // } 
    // if(!input.season) errors.season = 'Write the name of a season'
    // else if(!/(?:Summer|Winter|Autumn|Spring)/.test(input.season)){
    //   errors.season = 'Write only one season (Summer, Winter, Autumn, Spring)'
    // }
    return errors;
  
  }
  // const [errorButton, setErrorButton ] = useState(Object.keys(errors).length < 1? true : false)

  const [ input, setInput ] = useState({
    name: '',
    difficulty: '',
    length: '', 
    season: '',
    countries: []
  });

  useEffect(() => {
    dispatch(getCountryNames());
    dispatch(getActivitiesNames());
  }, [dispatch])

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  };



  const handleSelect = (e) => {
    if(!input.countries.includes(e.target.value))
    setInput({
      ...input,
      countries: [...input.countries, e.target.value ]
    })
  };

  const handleDelete = (el) => {
    setInput({
      ...input,
      countries: input.countries.filter(c => c !== el)
    })
    setErrors('')
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(input))
  
    if(errors.name || errors.difficulty || errors.length || errors.season){
      alert("Error: Sorry, there's still some ivalid values")
      e.preventDefault()
      setErrors('')
    }
    else if(!input.name || !input.difficulty || !input.length || !input.season){
      alert("Error: There are values missing, please fill all the fields needed")
      e.preventDefault()
      setErrors('')
    }
    else {
      dispatch(postActivity(input))
      alert("Activity created! it will soon appear for the country you want to have it")
      setErrors('')
      history.push('/home')
    }
    // setInput({
    //   name: '',
    //   difficulty: '',
    //   length: '', 
    //   season: '',
    //   countries: []
    // })
   
  }


 
  return (
    
    <div className='container-create-city-component'>
      <Link to='/home'>
        <button id='get-back-form'>Get back</button>
      </Link>
      <h1 id='text-before-form'>Create an activity for an especific country!</h1>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <p id='form-instruction'>Fill the folling fields with their respective values</p>
          <label className='other'> Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input className='fields' type='text' value={input.name} name='name' onChange={handleChange} />
          {errors.name && (<p className='error'>{errors.name}</p>)}      
        </div>
        <div className='check' >
          <label className='other'>Difficulty:</label>
          <input type='number' value={input.difficulty} className='fields' name='difficulty' onChange={handleChange} placeholder='Write a number between 1 (easiest) and 5 (hardest)' /> 
    
          {errors.difficulty && (<p className='error'>{errors.difficulty}</p>)}       
        </div>
        <div >
          <label className='other'>Length:</label>
          <input className='fields' type='text' value={input.duration} name='duration' onChange={handleChange} placeholder='Ej. 4 days, 15 days, 2 week, 1 month, etc'/>
          {errors.duration && (<p className='error'>{errors.duration}</p>)}       

        </div>
        <div className='seasons' >
          <label className='other'>Season: &nbsp;&nbsp;&nbsp;</label>
          <input className='fields' type='text' value={input.season} name='season' onChange={handleChange} placeholder='Ej. "Summer", "Winter", "Autumn", "Spring"  '/>
          {errors.season && (<p className='error'>{errors.season}</p>)}       
          
        </div>
        <div >
        <label className='other'>Countries: <select className='fields' onChange={handleSelect} >
          {
            countryNames.map(names => {
              return (
                 <option name='countriesOne' value={names}>{names}</option>
              )
            })
          }
        </select></label>
        {/* {errors.added && (<p className='error'>{errors.added}</p>)}        */}

        </div>
        <div>
          <button type='submit' name='countries' className='submit-form'  onClick={(el) => handleSubmit(el)}>Create</button>
        
        </div>
        {
        input.countries.map(el => {
          return (
            <div>
              <span >{el} </span>
              <button id='cancel-country' onClick={() => handleDelete(el)}>X</button>
            </div>
          )
        })
      }
      </form>
     
    </div>
  )
}