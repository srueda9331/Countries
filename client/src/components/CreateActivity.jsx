import React, {useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getActivities, postActivity } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";


function validate(input){
  let errors = {}
  if(!input.name) errors.name = 'Write the name of the activity';
  if(!input.difficulty) errors.difficulty = 'Set a difficulty from 1 to 5, where 5 is the highest difficulty';
  if(!input.length) errors.length = 'Set for how much time the activity is going to last';
  // if(!input.name) errors.name = 'Write a name';

  return errors;

}

export default function CreateActivity(){
  const dispatch = useDispatch();
  const history = useHistory();
  const activities = useSelector(state => state.activities);
  const [ errors, setErrors ] =useState({})

  const [ input, setInput ] = useState({
    name: '',
    difficulty: '',
    length: '', 
    season: '',
    countries: []
  });

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

  const handleCheck = (e) => {
    if(e.target.checked){
      setInput({
        ...input,
        status: e.target.value
      })
    }
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      activities: [...input.activities, e.target.value ]
    })
  };

  const handleDelete = (el) => {
    setInput({
      ...input,
      activities: input.activities.filter(c => c !== el)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(input))
    alert('Activity created')
    setInput({
      name: '',
      difficulty: '',
      length: '', 
      season: '',
      countries: []
    })
    history.push('/home')
  }

  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch]);

 
  return (
    <div>
      <Link to='/home'>
        <button>Get back</button>
      </Link>
      <h1>Create an activity for an especific country!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type='text' value={input.name} name='name' onChange={handleChange} />
          {errors.name && (<p className='error'>{errors.name}</p>)}      
        </div>
        <div>
          <label>Difficulty:</label>
          <input type='text' value={input.difficulty} name='difficulty' onChange={handleChange} /> 
          {errors.difficulty && (<p className='error'>{errors.difficulty}</p>)}       
        </div>
        <div>
          <label>Length:</label>
          <input type='text' value={input.length} name='length' onChange={handleChange} />
          {errors.length && (<p className='error'>{errors.length}</p>)}       

        </div>
        <div>
          <label>Season:</label>
          <label><input type='checkbox' value='Summer' name='Summer' onChange={handleCheck}/>Summer</label>
          <label><input type='checkbox' value='Winter' name='Winter' onChange={handleCheck}/>Winter</label>    
          <label><input type='checkbox' value='Autumn' name='Autumn' onChange={handleCheck}/>Autumn</label>    
          <label><input type='checkbox' value='Spring' name='Spring' onChange={handleCheck}/>Spring</label>    
        </div>
        {/* <select onChange={handleSelect}>
          {
            activities.map(activity => {
              return (
                 <option value={activity.countries}>{activity.countries}</option>
              )
            })
          }
        </select>
        <ul><li>{input.activities.map(el => el + ',')}</li></ul> */}
        <div>
          <input type='submit' value='Create'/>
        </div>
      </form>
      {/* {
        input.activities.map(el => {
          return (
            <div>
              <p>{el}</p>
              <button className='cancel-button' onClick={handleDelete}>X</button>
            </div>
          )
        })
      } */}
    </div>
  )
}