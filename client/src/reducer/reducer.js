import { GET_COUNTRIES, GET_COUNTRY_NAME, ORDER_BY_ABC } from "../actions/actions"


const initialState = {
  countries: [],
  countriesCopy: []
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
    return {
      ...state,
      countries: state.countries
    }
    default:
      return state
    
  }
}