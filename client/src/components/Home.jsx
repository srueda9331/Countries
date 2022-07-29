import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, orderByABC } from "../actions/actions";
import { Link } from "react-router-dom";
import Country from "./Countries";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";


export default function Home(){
  const dispatch = useDispatch();
  const [ order, setOrder ] = useState('')
  const allCountries = useSelector(state => state.countries);
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

  return (
    <div>
      <h1>COUNTRIES</h1>
      <Link to='./CreateActivity.jsx'>
        <button>Create activity</button>
      </Link>
      <button className='button-get-all-again' onClick={getCountriesAgain} >
        Get Countries Again
      </button>
      <div>
        <select onClick={(e) => handleSort(e)}>
          <option value='asc'>In Alphabetic Order</option>
          <option value='des'>From Z to A</option>
        </select>
        <select>
          <option value='continent'>Continent</option>
          <option value='activity'>Activity</option>
        </select>
      </div>
      <Paginate 
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginate={paginate}
      />
      <SearchBar />
      {
        currentCountries && currentCountries.map(country => {
          return (
            <div>
            <Link to='/id'>
              <Country 
                name={country.name} 
                image={country.image} 
                continent={country.continent} 
                key={country.id}
              />
            </Link>
            </div>
          )
        })
      }
    </div>
  )

}