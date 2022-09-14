import '../styles/Detail.css'
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getCountryDetail } from "../actions/actions";
import { Link } from "react-router-dom";

export default function CountryDetail(props){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(props.match.params.id));
    return ()=> dispatch(cleanDetail())
  }, [dispatch])

  const countryDetail = useSelector(state => state.detail)

  return (
    <div className='detail-container'>
     {
     countryDetail.name?
        (
          <div className='detail-props'>
          <div>
          <h1><span className='each-plane-text'>Alpha-3 code:</span> &nbsp;{countryDetail.id}</h1>
          <h1><span className='each-plane-text'>Country:</span>&nbsp; {countryDetail.name}</h1>
          <img src={countryDetail.image} alt={countryDetail.name} id='img-detail'/>
          </div>
          <div>
          <h2><span className='each-plane-text'>Continent:</span>&nbsp; {countryDetail.continent}</h2>
          <h3><span className='each-plane-text'>Capital:</span>&nbsp; {countryDetail.capital}</h3>
          {
          countryDetail.subregion?
          <h3><span className='each-plane-text'>Subregion:</span>&nbsp; {countryDetail.subregion}</h3> : null
          }
          <h3><span className='each-plane-text'>Area:</span> &nbsp;
            { 
              countryDetail.area.length < 4? countryDetail.area : 
              countryDetail.area.length === 4 && countryDetail.area.includes('.')? countryDetail.area : 
              countryDetail.area.length === 4 ? countryDetail.area[0] + '.'+ countryDetail.area.slice(1, 5) : 
              countryDetail.area.length === 5? countryDetail.area.slice(0,2) + '.'+ countryDetail.area.slice(2, 6) : 
              countryDetail.area.length === 6? countryDetail.area.slice(0, 3) + '.'+ countryDetail.area.slice(3, 7) : 
              countryDetail.area.length === 7? countryDetail.area[0] + '.' + countryDetail.area.slice(1, 4) + '. '+ countryDetail.area.slice(4, 9) :
              countryDetail.area.slice(0, 2) + '.' + countryDetail.area.slice(2,5) + '.' + countryDetail.area.slice(5, 9)
              
            } km²
          </h3>
          <h3><span className='each-plane-text'>Population:</span> &nbsp;
            {     
              
               countryDetail.population < 1000? countryDetail.population : 
               countryDetail.population < 10000? countryDetail.population.toString()[0] + '.' +  countryDetail.population.toString().slice(1,5): 
               countryDetail.population < 100000? countryDetail.population.toString().slice(0,2) + '.' +  countryDetail.population.toString().slice(2,5): 
               countryDetail.population < 1000000? countryDetail.population.toString().slice(0,3) + '.'+ countryDetail.population.toString().slice(3, 6) : 
               countryDetail.population < 10000000? countryDetail.population.toString()[0] + '.' +countryDetail.population.toString().slice(1, 4) + '.'+ countryDetail.population.toString().slice(4, 8) : 
               countryDetail.population < 100000000? countryDetail.population.toString().slice(0,2) + '.' + countryDetail.population.toString().slice(2, 5) + '.'+ countryDetail.population.toString().slice(5, 8) :
               countryDetail.population < 1000000000? countryDetail.population.toString().slice(0, 3) + '.' + countryDetail.population.toString().slice(3,6) + '.' + countryDetail.population.toString().slice(6, 9):
               countryDetail.population < 2000000000?countryDetail.population.toString()[0] + '.' + countryDetail.population.toString().slice(1, 4) + '.' + countryDetail.population.toString().slice(4,7) + '.' + countryDetail.population.toString().slice(7, 10):
               
               countryDetail.population
            
            } citizens</h3>
          
          {
          countryDetail.activities? 
          countryDetail.activities.map(el => <p><b><span className='each-plane-text'>Activity </span></b>: <span>[ </span><b>Name: </b> {el.name[0].toUpperCase() + el.name.slice(1).toLowerCase()},&nbsp;&nbsp; <b>Difficulty:</b> {el.difficulty},&nbsp;&nbsp; <b>Length:</b> {el.length}, &nbsp;&nbsp;<b>Season:</b> {el.season}<span> ]</span> </p>  ) : null
          }
          <Link to='/home'>
            <div>
              <button id='detail-button-goback'>Get Back</button>
            </div>
          </Link>
          </div>
        </div> ) 
      
        :
        (
          <div id='error-msg-detail'>
            <p>Sorry, the country you're looking for doesn't exist <img src='https://cdn.icon-icons.com/icons2/1123/PNG/512/sadface_79592.png' alt='sad face' width='30px' height='30px'></img></p>
          </div>
        )
}
      
      
    </div>
  )

}


