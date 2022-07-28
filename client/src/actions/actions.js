import axios from 'axios'

export const GET_COUNTRIES = 'GET_COUNTRIES';


export function getCountries(dispatch){
  return async function(dispatch){
    let countries = await axios.get('http://localhost:3001/countries')
    return dispatch( {
      type: GET_COUNTRIES,
      payload: countries.data
    })
  }
}