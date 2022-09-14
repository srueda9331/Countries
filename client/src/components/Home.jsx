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
  const [ filtro, setFiltro ] =useState('')
  const [ pages, setPages ] = useState('')

  const allCountries = useSelector(state => state.countries);
  const activities = useSelector(state => state.activities);



  const [ currentPage, setCurrentPage ] = useState(1);
  const [ countriesPerPage ] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  useEffect(() => {
    dispatch(getCountries(pages, order, filtro))
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivitiesNames())
  }, [dispatch]);



  const getCountriesAgain = (e) => {
    e.preventDefault(e);
    dispatch(getCountries())
  };
  

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByABC(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  

  const handleFilterContinent = (e) =>{
    dispatch(filterByContinet(e.target.value))
    setCurrentPage(1);
  }

  const handleFilterByActivity = (e) =>{
    dispatch(filterByActivity(e.target.value))
    setCurrentPage(1)
    // console.log(payload)
  }
  return (
    <div className='main-container'>
      <h1 id='title-home'>COUNTRIES</h1>
      <Link to='./activity'>
        <button className='button-get-all-again-create-search'>Create activity</button>
      </Link>
      <button className='button-get-all-again-create-search' onClick={getCountriesAgain} >
        Get Countries Again
      </button>
      <div id='container-selects'>
      <span className='spans'>Order by: </span>
        <select onClick={(e) => handleSort(e)} className='selects'>
          <option value='asc'>In Alphabetic Order</option>
          <option value='des'>From Z to A</option>
          <option value='high'>From highest to lowest population</option>
          <option value='low'>From lowest to highest population</option>
        </select>
        <span className='spans'>Filter by continet: </span>
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
        <span className='spans'>Filter by activity: </span>
        <select onClick={(e) => handleFilterByActivity(e)} className='selects'>
          <option value='All'>All</option>
          {
            activities.map(el => <option value={el}>{el}</option>)
          }
         
        </select>
      </div>
    
      <SearchBar />
      <Paginate 
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginate={paginate}
      />
      {
        currentCountries? currentCountries.map(country=> {
          return (
            <div className='container-home-country'>
            <div key={country.id}  >
            <Link key={country.id} className='link-each-card' to={`home/${country.id}`} >
              <Country 
                name={country.name} 
                image={country.image} 
                continent={country.continent}
                
                activities={country.activities} 
                key={country.id} 
              />
            </Link>
            </div>
            </div>

          )
        }) : 
        <div>
          <p>Cannot find nothing</p>
        </div>
 
      }
    </div>
  )

}