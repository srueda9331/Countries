import axios from 'axios'


export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY_NAME = 'GET_COUNTRY_NAME';
export const GET_NAMES = 'GET_NAMES';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_ACTIVITIES_NAME = 'GET_ACTIVITIES';
export const POST_ACTIVITIES = 'GET_ACTIVITIES';
export const ORDER_BY_ABC = 'ORDER_BY_ABC';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_CONTINENT';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const ACTIVITY = 'ACTIVITY';



export function getCountries(page, order, filtro){
  return async function(dispatch){
    try {
      let countries = await axios.get('http://localhost:3001/countries?page=' + page + '&order=' + order + '&filter=' + filtro)
      return dispatch( {
        type: GET_COUNTRIES,
        payload: countries.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getActivities(){
  return async function(dispatch){
    try {
      let activities = await axios.get('http://localhost:3001/activities/')
      return dispatch( {
        type: GET_ACTIVITIES,
        payload: activities.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getActivitiesNames(){
  return async function(dispatch){
    try {
      let activitiesOne = await axios.get('http://localhost:3001/activities/h')
      return dispatch( {
        type: GET_ACTIVITIES_NAME,
        payload: activitiesOne.data
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

export function getCountryNames(){
  return async function(dispatch){
    try {
      let getNames = await axios.get('http://localhost:3001/activities/other')
      return dispatch({
        type: GET_NAMES,
        payload: getNames.data
      })
      
    } catch (error) {
      console.log(error);
    }
  }
}

export function postActivity(payload){
  return async function(){
    try {
      const createActivity = await axios.post('http://localhost:3001/activities', payload);
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

export function filterByContinet(payload){
  console.log(payload);
  return {
    type: FILTER_BY_CONTINENT,
    payload
  }
}

export function filterByActivity(payload){
  try {
    return {
      type: ACTIVITY,
      payload
    }
    
  } catch (error) {
    console.log(error);
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

export function cleanDetail(payload){
  return {
    type: CLEAN_DETAIL,
    payload: []
  }
}
