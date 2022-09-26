import '../styles/Countries.css'
import React from "react";
import { useSelector } from 'react-redux';



export default function Country({name, image, continent, activities, population, populationOrder }){
  
  const allCountries = useSelector(state => state.countries)


  // const filterActivityCreated =  allCountries?.filter(c => c?.activities[0]) || null
  // const listActivities = []
  // for (let i = 0; i < filterActivityCreated?.length; i++) {
  //   let g = filterActivityCreated[i]
  //   for (let j = 0; j < g?.activities?.length; j++) {
  //     if(!listActivities.includes(g?.activities[j]?.name)){
  //       listActivities.push(g?.activities[j]?.name)
  //     }
               
  //   }
  // }
  
  // console.log(listActivities);

  return (

    <div className='country-container'>
      <h2 className='name-country'>
        {
          name.length > 15? name[0].toUpperCase() + name.slice(1,15) + ' ...' : name[0].toUpperCase() + name.slice(1,15)
        }
      </h2>
      <img className='img-country' src={image} alt={name} width='180px' height='135px'/>
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
    
    </div>
  )
}