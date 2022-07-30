import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../actions/actions";
import { Link } from "react-router-dom";

export default function CountryDetail(props){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(props.match.params.id));
  }, [dispatch])

  const countryDetail = useSelector(state => state.detail)

  return (
    <div>
     {
     countryDetail.name?
        (
          <div>
          <h1>Alpha-3 code: {countryDetail.id}</h1>
          <h1>Country: {countryDetail.name}</h1>
          <img src={countryDetail.image} alt={countryDetail.name} />
          <h2>Continent: {countryDetail.continent}</h2>
          <h3>Capital: {countryDetail.capital}</h3>
          <h3>Subregion: {countryDetail.subregion}</h3>
          <h3>Area: {countryDetail.area} km2</h3>
          <h3>Population: {countryDetail.population} citizens</h3>
        </div> ) 
        :
        (<div>
          <p>Sorry, the country you're looking for doesn't exist <img src='https://cdn.icon-icons.com/icons2/1123/PNG/512/sadface_79592.png' alt='sad face' width='30px' height='30px'></img></p>
         </div>)
}
      
      <Link to='/home'>
        <button>Get Back</button>
      </Link>
    </div>
  )

}


