import '../styles/Countries.css'
import React from "react";
import { useSelector } from 'react-redux';


export default function Country({name, image, continent, activities, population, populationOrder}){

  const allCountries = useSelector(state => state.countries)
 

  const filterActivityCreated =  allCountries?.filter(c => c.activities) || null
  const listActivities = []
  for (let i = 0; i < filterActivityCreated?.length; i++) {
    let activity = filterActivityCreated[i]
    for (let j = 0; j < activity?.activities?.length; j++) {
      if(!listActivities.includes(activity?.activities[j]?.name)){
        listActivities.push(activity?.activities[j]?.name)
      }
               
    }
  }


  return (

    <div className='country-container'>
      <h2 className='name-country'>
        {
          name.length > 15? name[0].toUpperCase() + name.slice(1,15) + ' ...' : name[0].toUpperCase() + name.slice(1,15)
        }
      </h2>
      <img className='img-country' src={image} alt={name} width='160px' height='115px'/>
        {
          populationOrder.length?
          <h3 className='name-continent' style={{fontSize: '17px'}}>
            {
            population < 1000? population : 
            population < 10000? population.toString()[0] + '.' +  population.toString().slice(1,5): 
            population < 100000? population.toString().slice(0,2) + '.' +  population.toString().slice(2,5): 
            population < 1000000? population.toString().slice(0,3) + '.'+ population.toString().slice(3, 6) : 
            population < 10000000? population.toString()[0] + '.' +population.toString().slice(1, 4) + '.'+ population.toString().slice(4, 8) : 
            population < 100000000? population.toString().slice(0,2) + '.' + population.toString().slice(2, 5) + '.'+ population.toString().slice(5, 8) :
            population < 1000000000? population.toString().slice(0, 3) + '.' + population.toString().slice(3,6) + '.' + population.toString().slice(6, 9):
            population < 2000000000?population.toString()[0] + '.' + population.toString().slice(1, 4) + '.' + population.toString().slice(4,7) + '.' + population.toString().slice(7, 10):
            population
            } citizens
          </h3>
          :
          <h3 className='name-continent'>{continent}</h3>
        }
      <div>
        <div>
          <span>
            {
              filterActivityCreated.length === 0 || activities?.length === 0 || activities?.length === 1? <span className='activity-name'><b>Activity: &nbsp;</b></span> : null
            }
          </span>
          <span>
            {
              filterActivityCreated.length === 0 || activities?.length === 0? <span className='activity-name'> - - - &nbsp;&nbsp;</span> : null
            }
          </span>  
          <span>
            {
              activities?.length > 1? <span className='activity-name'><b>Activities: &nbsp;</b></span> : null
            }
          </span>
          <span>
            {
              activities?.length === 1?  activities.map(el => <span className='activity-name'>{el.name[0].toUpperCase() + el.name.slice(1).toLowerCase() + ''}</span>) : null 
            }
          </span>
          {/* <span>
            {
              activities?.length > 1 && activities?.length <= 4?  
              activities.map(el => <span className='activity-name'>{ el.name[0].toUpperCase() + el.name.slice(1).toLowerCase()}, &nbsp;</span>): null
            }
          </span> */}
           <span>
            {
              activities?.length > 1 && activities?.length <= 3?  
              <span className='activity-name'>{ activities[0]?.name[0].toUpperCase() + activities[0].name.slice(1).toLowerCase()}</span>: null
            }
          </span>
          <span>
            {
              activities?.length > 1 && activities?.length <= 3?  
              <span className='activity-name'>, {activities[1]?.name[0].toUpperCase() + activities[1]?.name.slice(1).toLowerCase()}</span>: null
            }
          </span>
          <span>
            {
              activities?.length > 2 && activities?.length <= 3 ?  
              <span className='activity-name'>, {activities[2]?.name[0].toUpperCase() + activities[2]?.name.slice(1).toLowerCase()}</span>: null
            }
          </span>
          <span>
            {
              activities?.length > 3 && listActivities.length > 0? <span className='activity-name'>{ activities[0]?.name[0].toUpperCase() + activities[0].name.slice(1).toLowerCase()}</span> : null
            }
          </span>
          <span>
            {
              activities?.length > 3 && listActivities.length > 0? <span className='activity-name'>, {activities[1]?.name[0].toUpperCase() + activities[1]?.name.slice(1).toLowerCase()}</span> : null
            }
          </span>
          <span>
            {
              activities?.length > 3 && listActivities.length > 0? <span className='activity-name'>, {activities[2]?.name[0].toUpperCase() + activities[2]?.name.slice(1).toLowerCase()}</span> : null
            }
          </span>
          <span>
            {
              activities?.length > 3 && listActivities.length > 0? <span className='activity-name'>, ...</span> : null
            }
          </span>
        </div>
      </div>  
    </div>
  )
}