import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../actions/actions";
import { Link } from "react-router-dom";
import Country from "./Countries";

export default function Home(){
  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.countries);

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  const getCountriesAgain = (e) => {
    e.preventDefault(e);
    dispatch(getCountries())
  }

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
        <select>
          <option value='asc'>In Alphabetic Order</option>
          <option value='des'>From Z to A</option>
        </select>
        <select>
          <option value='continent'>Continent</option>
          <option value='activity'>Activity</option>
        </select>
      </div>
      {
        allCountries && allCountries.map(country => {
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