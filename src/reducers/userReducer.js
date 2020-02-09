import {
  LOADING,
  LOAD_MOST_POPULAR_USERS,
  ERROR_WHILE_FETCHING_INITIAL_TABLE,
  CITY_TO_SEARCH,
  SNACKBAR_STATUS,
} from '../actions/types'

const initialState = {
  loading: false,
  error_while_fetching_initial_table: false,
  error_while_fetching_initial_data: false,
  city_to_search: '',
  snackbar: false,
  topTenUsersInCity: [],
}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case LOADING:
      return {
        ...state,
        loading: actions.payload,
      }
    case SNACKBAR_STATUS:
      console.log('SNACKBAR COMING TO REDUCER ', actions.payload)
      return {
        ...state,
        snackbar: actions.payload,
      }
    case LOAD_MOST_POPULAR_USERS:
      // console.log('RESP IN REDUCER ', state.topTenUsersInCity)
      return {
        ...state,
        loading: false,
        snackbar: false,
        topTenUsersInCity: actions.payload.topTenUsersInCity,
      }
    case ERROR_WHILE_FETCHING_INITIAL_TABLE:
      return {
        ...state,
        snackbar: true,
      }
    case CITY_TO_SEARCH:
      return {
        ...state,
        city_to_search: actions.payload,
      }

    default:
      return state
  }
}
