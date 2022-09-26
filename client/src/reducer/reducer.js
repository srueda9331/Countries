import { CLEAN_DETAIL, 
         FILTER_BY_CONTINENT, 
         GET_NAMES,
         GET_COUNTRIES, 
         GET_COUNTRY_DETAIL, 
         GET_COUNTRY_NAME, 
         ORDER_BY_ABC, 
         POST_ACTIVITIES, 
         GET_ACTIVITIES,
         GET_ACTIVITIES_NAME,
         ACTIVITY              } from "../actions/actions"


const initialState = {
  countries: [],
  countriesCopy: [],
  countriesCopyTwo: [],
  countriesCopyThree: [],
  getNames: [],
  detail: [],
  activities: [],
  getActivitiesOne: [],
  
}

export default function Reducer(state = initialState, action){
  switch(action.type){
    case GET_COUNTRIES:
    return {
      ...state,
      countries: action.payload,
      countriesCopy: action.payload,
      countriesCopyTwo: action.payload,
      countriesCopyThree: action.payload
    }
    case GET_COUNTRY_NAME:
      return {
        ...state,
        countries: action.payload
      }
    case GET_NAMES:
      return {
        ...state,
        getNames: action.payload
      }
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        
      }
    case GET_ACTIVITIES_NAME:
      console.log(action.payload);
      return {
        ...state,
        getActivitiesOne: action.payload
    
      }  
    case POST_ACTIVITIES:
        return {
          ...state,
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
            if(a.population < b.population) return -1;
            if(b.population < a.population) return 1;
            return 0;
          })
        }
      return {
        ...state,
        countries: state.countries
      }
    case FILTER_BY_CONTINENT:
      const allCountries = state.countriesCopyThree
      const filteredContinent = action.payload === 'All'? allCountries : allCountries.filter(c => c.continent === action.payload)
      return {
        ...state,
        countries: action.payload !== 'All'? filteredContinent :  state.countriesCopyTwo
      }
    case ACTIVITY:
      const allCountry = state.countriesCopy
      
      let filteredActivity = [];
      
      const act = allCountry.filter(c => c.activities[0])

      for (let i = 0; i < act.length; i++) {
        let activityValue = act[i]
        for (let j = 0; j < activityValue.activities.length; j++) {
          console.log(activityValue.activities[j].name === action.payload);
          if(activityValue.activities[j].name === action.payload){
            filteredActivity.push(activityValue)
          }          
        }
      }
      return {
        ...state,
        countries: filteredActivity.length > 0 ? filteredActivity : act[0]? act : state.countriesCopy
      }
    
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        detail: action.payload
      }
    case CLEAN_DETAIL:
      return {
        ...state,
        detail: action.payload
      }
    default:
      return state
  }
}