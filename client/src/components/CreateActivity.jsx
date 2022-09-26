import '../styles/CreateActivity.css'
import React, {useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {  getActivitiesNames, getCountryNames, postActivity, getCountries } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';


export default function CreateActivity(){
  const dispatch = useDispatch();
  const history = useHistory();
  const activityOne = useSelector(state => state.activities)
  const countryNames = useSelector(state => state.getNames)
  const [ errors, setErrors ] =useState({})
  const [message, setMessage ] = useState('disable')
  const [ limit, setLimit ] = useState('')


  const allCountries = useSelector(state => state.countries)
  // console.log(allCountries);
  // const filterActivityCreated = allCountries.filter(c => c?.activities[0]) || null
  // const listActivities = []
  // for (let i = 0; i < filterActivityCreated.length; i++) {
  //   let allActivity = filterActivityCreated[i].activities;
  //   let getNameAct = filterActivityCreated[i].name;
  //   for (let j = 0; j < allActivity.length; j++) {
  //     if(allActivity.length > 7){
  //       if(!listActivities.includes(getNameAct))
  //         listActivities.push(getNameAct)
  //     }        
  //   }
  // }
  // console.log(listActivities);

  useEffect(() => {
    if(Object.values(errors).length > 0){
      setMessage('')
    }
  })

  useEffect(() => {
    dispatch(getCountries())
  })
  function validate(input){
    let errors = {}
   
    if(!input.name) errors.name = 'Please, write the name of an activity';
    else if(input.name.length < 3) errors.name = 'The name of the activity is to short at least 3 characteres'
    else if(!/^[a-zA-z]+$/.test(input.name)) errors.name = 'Write only letters of the activity or sport'
    else if(input.name.length > 12) errors.name = 'The name of the activity should not surpass 12 characteres'
    else if(activityOne.includes(input.name.toLowerCase())) errors.name = 'The name of the activity already exits';
    if(!input.difficulty) errors.difficulty = 'Set a number between 1 and 5, where 1 (easiest) and 5 (most difficulty)'
    else if(input.difficulty < 1 || input.difficulty > 5 ) errors.difficulty = 'Write only one number in the range (1,2,3,4,5)'
    if(!input.duration) errors.duration = 'Set for how much time the activity is going to last'
    else if(!/^[0-9][0-9]?\s[a-z]+[s | h | r | k | y]$/.test(input.duration)) errors.duration = 'Write a number of one or two digits first, space and a day, week, month in singular or plural'
    else if(input.duration.length > 12) errors.duration = 'The length field should not surpass 12 characteers'
    if(!input.season) errors.season = 'Write the name of a season'
    else if(!/(?:Summer|Winter|Autumn|Spring)$/.test(input.season)){
      errors.season = 'Write only one season Summer, Winter, Autumn or Spring'
    } 
 
    return errors;
  
  }
 

  const [ input, setInput ] = useState({
    name: '',
    difficulty: '',
    duration: '', 
    season: '',
    countries: []
  });


  
   useEffect(() => {
    dispatch(getCountryNames());
    dispatch(getActivitiesNames());
  }, [dispatch])

  // useEffect(() => {
  //   if(input.countries[0]){
  //     if(filterActivityCreated[0]){
  //       for (let i = 0; i < input.countries.length; i++) {
  //         let nameCountry = input.countries[i];
  //           for (let j = 0; j < filterActivityCreated.length; j++) {
  //             let activityLength = filterActivityCreated[j].activities;
  //               if (filterActivityCreated[j].name === nameCountry) {
  //                 for(var k = 0; k < activityLength.length; k++){
  //                   if(activityLength.length > 7){
  //                     setLimit('exceeded')
  //                   }
  //                 }
  //               }
  //           }
  //       }
  //     }
  //   }
  // })

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
    
    // if(filterActivityCreated[0]){
    //   for (let i = 0; i < filterActivityCreated.length; i++) {
    //     let getActivities = filterActivityCreated[i].activities;
    //       if (filterActivityCreated[i].name === el) {
    //         for(var j = 0; j < getActivities.length; j++){
    //           setLimit('')
    //         }
    //       }
    //   }
    // }
   
      setInput({
        ...input,
        countries: input.countries.filter(c => c !== el)  
      }) 
    
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(input))
    setMessage('')
    if(errors.name || errors.difficulty || errors.duration || errors.season || message.length || limit.length){
      // alert("Error: Sorry, there's still some ivalid values")
      e.preventDefault()
      // setErrors('')
    }
    else if(!input.name || !input.difficulty || !input.duration || !input.season || message.length || limit.length){
      // alert("Error: There are values missing, please fill all the fields needed")
      e.preventDefault()
      // setErrors('')
    }
    else {
      setMessage('')
      dispatch(postActivity(input))
      swal({
        title:'Activity created!',
        text:'It will soon appear for the country you want to have it',
        icon: 'success',
        timer: '4000' 
      })
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
        <h1 id='text-before-form'>Create and book an activity in an especific country (while travelling)!</h1>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <p id='form-instruction'>Fill the folling fields with their respective values and add at least one country for the activity to be created</p>
          <p>
            {
              activityOne.length > 100? <span style={{color: 'red'}}>You've already reached the limit of existing activities created,</span> : null
            }
          </p>
          <p style={{marginTop: '-14px'}}>
            {
              activityOne.length > 100? <span style={{color: 'red'}}>the app will stop creating new activities</span> : null
            }
          </p>
          {/* <p>
            {
              limit.length > 0 && listActivities.length === 1? 
                <span style={{color: 'red'}}>{listActivities[0]} has surpassed the limit of 8 activities per country</span> 
                : 
                null
            }
          </p>
          <p>
            {
              limit.length > 0 && listActivities.length > 1? 
                <span style={{color: 'red'}}>
                  {listActivities.map(el => el + ', ') } 
                  these countries have surpassed the limit of 8 activities per country
                </span> 
                : 
                null
            }
          </p> */}
          <label className='other'> Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input className='fields' type='text' value={input.name} name='name' onChange={handleChange} placeholder='Write a name of a known sport or whatever you like' />
          {errors.name && (<p className='error'>{errors.name}</p>)}      
        </div>
        <div className='check' >
          <label className='other'>Difficulty:</label>
          <input type='number' value={input.difficulty} className='fields' name='difficulty' onChange={handleChange} placeholder='Write a number between 1 (easiest) and 5 (hardest)' /> 
    
          {errors.difficulty && (<p className='error'>{errors.difficulty}</p>)}       
        </div>
        <div >
          <label className='other' >Length:</label>
          <input className='fields' style={{marginLeft: '29px'}} type='text' value={input.duration} name='duration' onChange={handleChange} placeholder='Ej. 4 days, 15 days, 2 week, 1 month, 3 months, etc'/>
          {errors.duration && (<p className='error'>{errors.duration}</p>)}       

        </div>
        <div className='seasons' >
          <label className='other' style={{marginLeft: '5px'}}>Season: &nbsp;&nbsp;&nbsp;</label>
          <input className='fields' style={{marginLeft: '13px'}}  type='text' value={input.season} name='season' onChange={handleChange} placeholder='Ej. "Summer", "Winter", "Autumn", "Spring"  '/>
          {errors.season && (<p className='error'>{errors.season}</p>)}       
          
        </div>
        <div >
        <label className='other'>Countries: 
          <select className='fields' style={{marginLeft: '13px'}} onClick={handleSelect} >
            {
              countryNames.map(n => {
                return (
                  <option name='countriesOne' value={n.name}>{n.name}</option>
                )
              })
            }
          </select>
        </label>

        </div>
        <div>
          <button disabled={Object.values(errors).length === 0 && !message.length && !limit.length && input.countries.length !== 0 && activityOne.length < 101? false : true} 
                  type='submit' name='countries' 
                  className={Object.values(errors).length === 0 && !message.length && !limit.length && input.countries.length !== 0 && activityOne.length < 101? 'submit-form' : 'submit-form-disabled' }  
                  onClick={(el) => handleSubmit(el)}>
                  Create
          </button>
        </div>
        {
        input.countries.map(el => {
          return (
            <span>
              <span >{el} </span>
              <button id='cancel-country' onClick={(e) => {e.preventDefault(); return handleDelete(el)}}>X</button>
              &nbsp;&nbsp;&nbsp;
            </span>
          )
        })
      }
      </form>
      <Link to='/home'>
        <button id='get-back-form'>Get back</button>
      </Link>
    </div>
  )
}