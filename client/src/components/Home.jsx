import '../styles/Home.css'
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByActivity, filterByContinet, getActivitiesNames, getCountries, orderByABC } from "../actions/actions";
import { Link } from "react-router-dom";
import Country from "./Countries";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";


export default function Home(){
  const dispatch = useDispatch();
  const [ order, setOrder ] = useState('')
  const [ populationOrder, setPopulation ] = useState('')
  const [msg, setMsg] = useState('')
  const allCountries = useSelector(state => state.countries);
  const names = allCountries.map(c => c.name.toLowerCase())
  const activities = useSelector(state => state.getActivitiesOne);
  console.log(activities + 'ppp');

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ countriesPerPage ] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivitiesNames())
    console.log(dispatch(getActivitiesNames()));
  }, [dispatch]);



  const getCountriesAgain = (e) => {
    e.preventDefault(e);
    dispatch(getCountries())
    setCurrentPage(1)
  };
  

  const handleSort = (e) => {
    setMsg('')
    e.preventDefault();
    dispatch(orderByABC(e.target.value));
    setCurrentPage(1);
    setPopulation('getPopulation')
    setOrder(e.target.value);
  };

  

  const handleFilterContinent = (e) =>{
    setMsg('')
    dispatch(filterByContinet(e.target.value))
    setCurrentPage(1);
    setPopulation('')
  }

  const handleFilterByActivity = (e) =>{
    if (activities[0]) {
      dispatch(filterByActivity(e.target.value))
      setCurrentPage(1)
    } else {
      setMsg('No acivities yet')
    }
  }

  return (
    <div className='main-container'>
      <h1 id='title-home'>
        COUNTRIES ALL OVER THE WORLD !
      </h1>
      <Link to='./activity'>
        <button className='button-get-all-again-create-search'>
          Create Activity!
        </button>
      </Link>
      <button className='button-get-all-again-create-search' onClick={getCountriesAgain} >
        Start Again
      </button>

      <div id='container-selects'>
      <span className='spans'>Order by: </span>
        <select onClick={(e) => handleSort(e)} className='selects'>
          <option value='asc'>In Alphabetic Order</option>
          <option value='des'>From Z to A</option>
          <option value='high'>From highest to lowest population</option>
          <option value='low'>From lowest to highest population</option>
        </select>

        <span className='spans'>Filter by Continet: </span>
        <select onClick={(e) => handleFilterContinent(e)} className='selects'>
          <option value='All'>All</option>
          <option value='North America'>North America</option>
          <option value='South America'>South America</option>
          <option value='Europe'>Europe</option>
          <option value='Asia'>Asia</option>
          <option value='Africa'>Africa</option>
          <option value='Oceania'>Oceania</option>
          <option value='Antarctica'>Antarctica</option>
        </select>

        <span className='spans'>Filter by Activity: </span>
        <select onClick={(e) => handleFilterByActivity(e)} className='selects' style={{width: '98px'}}>
          <option value='All'>All</option>
          {
            activities.map(el => <option value={el}>{el[0].toUpperCase() + el.slice(1).toLowerCase()}</option>)
          }
        </select>
      </div>
    
      <SearchBar setCurrentPage={setCurrentPage} names={names}/>
      <Paginate 
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginate={paginate}
      />
      { msg.length? 
        <h1 id='no-activity-created'>You have to create an activity for a country first
          <p style={{marginTop: '5px', fontSize: '28px'}}>(Check the Activity Create button)</p>
        </h1>
        :
        currentCountries.length === 0?
        <h1 id='just-begin'>Please, wait a moment...</h1>
        :
        currentCountries? 
        currentCountries.map(country=> {
          return (
            <div className='container-home-country'>
              <div key={country.id}  >
              <Link key={country.id} className='link-each-card' to={`home/${country.id}`} >
                <Country 
                  name={country.name} 
                  image={country.image} 
                  continent={!populationOrder? country.continent : null}
                  population={populationOrder.length? country.population :  null}
                  activities={country.activities}
                  key={country.id}
                  populationOrder={populationOrder} 
                />
              </Link>
              </div>
            </div>
          )
        }) 
        : 
        <div>
          <p>Cannot find nothing</p>
        </div>
 
      }
    </div>
  )

}