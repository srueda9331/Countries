import '../styles/Detail.css'
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getCountryDetail } from "../actions/actions";
import { Link } from "react-router-dom";

export default function CountryDetail(props){
  const dispatch = useDispatch();
  let id = 1;
  
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
          <h1><span className='first-block-plane-text'>Alpha-3 code:</span> &nbsp;{countryDetail.id}</h1>
          <h1><span className='first-block-plane-text'>Country:</span>&nbsp; {countryDetail.name}</h1>
          <img src={countryDetail.image} alt={countryDetail.name} id='img-detail'/>
          </div>
          <div>
          <h2 className='second-block-plane-text'><span>Continent:</span>&nbsp; <span className='span-detail'>{countryDetail.continent}</span></h2>
          <h3 className='second-block-plane-text'><span>Capital:</span>&nbsp; <span className='span-detail'>{countryDetail.capital}</span></h3>
          {
          countryDetail.subregion?
            <h3 className='second-block-plane-text'><span>Subregion:</span>&nbsp; <span className='span-detail'>{countryDetail.subregion}</span></h3> : null
          }
          <h3 className='second-block-plane-text'><span>Area:</span> &nbsp;
            <span className='span-detail'>
              { 
                countryDetail.area.length < 4? countryDetail.area : 
                countryDetail.area.length === 4 && countryDetail.area.includes('.')? countryDetail.area : 
                countryDetail.area.length === 4 ? countryDetail.area[0] + '.'+ countryDetail.area.slice(1, 5) : 
                countryDetail.area.length === 5? countryDetail.area.slice(0,2) + '.'+ countryDetail.area.slice(2, 6) : 
                countryDetail.area.length === 6? countryDetail.area.slice(0, 3) + '.'+ countryDetail.area.slice(3, 7) : 
                countryDetail.area.length === 7? countryDetail.area[0] + '.' + countryDetail.area.slice(1, 4) + '. '+ countryDetail.area.slice(4, 9) :
                countryDetail.area.slice(0, 2) + '.' + countryDetail.area.slice(2,5) + '.' + countryDetail.area.slice(5, 9)
                
              } km²
            </span>
          </h3>
          <h3 className='second-block-plane-text'><span>Population:</span> &nbsp;
            <span className='span-detail'>
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
            
            } citizens</span>
          </h3>
          
          {
            countryDetail.activities? 
            countryDetail.activities.map(el => <p style={{textAlgin: 'left', marginLeft: '-260px', display:'flex', justifyContent:'center'}}>
                                                  <b><span className='second-block-plane-text'>Activity {id++}: &nbsp;&nbsp;</span></b> 
                                                  
                                                  
                                                    <b>Name:&nbsp; </b> {el.name[0].toUpperCase() + el.name.slice(1).toLowerCase()},&nbsp;&nbsp; 
                                                    <b>Difficulty:&nbsp;</b> {el.difficulty},&nbsp;&nbsp; 
                                                    <b>Length:&nbsp;</b> {el.duration}, &nbsp;&nbsp;
                                                    <b>Season:&nbsp;</b> {el.season}<span></span> 
                                                </p>  
                                        )
            : 
            null
          }
          <Link to='/home'>
            <div>
              <button id='detail-button-goback'>Get Back</button>
            </div>
          </Link>
          </div>
        </div> 
        ) 
      
        :
        (
          
        !countryDetail.name?
          
          <div id='error-msg-detail'>
            <p style={{paddingBottom: '285px'}}>Sorry, the country you're looking for doesn't exist &nbsp;&nbsp;
              <img src='https://cdn.icon-icons.com/icons2/1123/PNG/512/sadface_79592.png' style={{marginTop:'5px'}} alt='sad face' width='30px' height='30px' />
              <Link to='/home'>
                <div>
                  <button style={{marginLeft: '2vh'}} id='detail-button-goback'>Get Back</button>
                </div>
              </Link>
              </p>
           
          </div> 
          :
          <div id='error-msg-detail'>
            <h1 >Loading...</h1>
          </div>
        ) 
  
    }
    </div>
  )

}


