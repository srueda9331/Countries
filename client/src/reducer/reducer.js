import { GET_ACTIVITIES,
         GET_COUNTRIES, 
         GET_COUNTRY_DETAIL, 
         GET_COUNTRY_NAME, 
         ORDER_BY_ABC, 
         POST_ACTIVITIES } from "../actions/actions"


const initialState = {
  countries: [],
  countriesCopy: [],
  activities: [],
  detail: []
}

export default function Reducer(state = initialState, action){
  switch(action.type){
    case GET_COUNTRIES:
    return {
      ...state,
      countries: action.payload,
      countriesCopy: action.payload
    }
    case GET_COUNTRY_NAME:
      return {
        ...state,
        countries: action.payload
      }
      case GET_ACTIVITIES:
        return {
          ...state,
        }
    case POST_ACTIVITIES:
      return {
        ...state,
        activities: action.payload
      }
    case ORDER_BY_ABC:
      if(action.payload === 'asc'){
        state.countries.sort((a, b) => {
          if(a.name > b.name) return 1;
          if(b.name > a.name) return -1;
          return 0;
        })
      }
      else if(action.payload === 'des'){
        state.countries.sort((a, b) => {
          if(a.name > b.name) return -1;
          if(b.name > a.name) return 1;
          return 0;
        })
      }
      else if(action.payload === 'high'){
        state.countries.sort((a, b) => {
          if(a.population > b.population) return -1;
          if(b.population > a.population) return 1;
          return 0;
        })
      }
      else if(action.payload === 'low'){
        state.countries.sort((a, b) => {
          if(a.population > b.population) return -1;
          if(b.population > a.population) return 1;
          return 0;
        })
      }
    return {
      ...state,
      countries: state.countries
    }
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        detail: action.payload
      }
    default:
      return state
    
  }
}