import axios from 'axios'
import swal from 'sweetalert'

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



export function getCountries(){
  return async function(dispatch){
    try {
      let countries = await axios.get(`/countries`)
      return dispatch( {
        type: GET_COUNTRIES,
        payload: countries.data
      })
    } catch (error) {
      window.location.reload()
    }
  }
}

export function getActivities(){
  return async function(dispatch){
    try {
      let activities = await axios.get(`/activities/`)
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
      let activitiesOne = await axios.get(`/activities/activity`)
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
      let getName = await axios.get(`/countries?name=` + name)
      return dispatch({
        type: GET_COUNTRY_NAME,
        payload: getName.data
      })
      
    } catch (error) {
      swal({
        title:'Sorry!',
        text:`But the country you're looking for can't be found`,
        icon: 'error',
        timer: '4000' 
      })
    }
  }
}

export function getCountryNames(){
  return async function(dispatch){
    try {
      let getNames = await axios.get(`/activities/names`)
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
      const createActivity = await axios.post(`/activities`, payload);
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
      let countryDetail = await axios.get(`/countries/` + id)
      return dispatch({
        type: GET_COUNTRY_DETAIL,
        payload : countryDetail.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function cleanDetail(){
  return {
    type: CLEAN_DETAIL,
    payload: []
  }
}
