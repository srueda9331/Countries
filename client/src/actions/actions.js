import axios from 'axios'

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY_NAME = 'GET_COUNTRY_NAME';
export const ORDER_BY_ABC = 'ORDER_BY_ABC';




export function getCountries(){
  return async function(dispatch){
    let countries = await axios.get('http://localhost:3001/countries')
    return dispatch( {
      type: GET_COUNTRIES,
      payload: countries.data
    })
  }
}

export function getCountryByName(name){
  return async function(dispatch){
    try {
      let getName = await axios.get('http://localhost:3001/countries?name=' + name)
      return dispatch({
        type: GET_COUNTRY_NAME,
        payload: getName.data
      })
      
    } catch (error) {
      console.log(error);
    }
  }
}

export function orderByABC(payload){
  return {
    type: ORDER_BY_ABC,
    payload
  }
}