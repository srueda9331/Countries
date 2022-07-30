import axios from 'axios'


export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY_NAME = 'GET_COUNTRY_NAME';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const POST_ACTIVITIES = 'GET_ACTIVITIES';
export const ORDER_BY_ABC = 'ORDER_BY_ABC';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL'


export function getCountries(){
  return async function(dispatch){
    try {
      let countries = await axios.get('http://localhost:3001/countries')
      return dispatch( {
        type: GET_COUNTRIES,
        payload: countries.data
      })
    } catch (error) {
      console.log(error);
    }
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

export function getActivities(){
  return async function(dispatch){
    try {
      let getActivity = await axios.get('http://localhost:3001/activities')
      return dispatch({
        type: GET_ACTIVITIES,
        payload: getActivity.data
      })
      
    } catch (error) {
      console.log(error);
    }
  }
}

export function postActivity(payload){
  return async function(){
    try {
      const createActivity = axios.post('http://localhost:3001/activities', payload);
      return createActivity;
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

export function getCountryDetail(id){
  return async function(dispatch){
    try {
      let countryDetail = await axios.get('http://localhost:3001/countries/' + id)
      return dispatch({
        type: GET_COUNTRY_DETAIL,
        payload : countryDetail.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}