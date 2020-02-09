import {
  LOAD_MOST_POPULAR_USERS,
  ERROR_WHILE_FETCHING_INITIAL_TABLE,
  CITY_TO_SEARCH,
} from '../actions/types'

const initialState = {
  loading: false,
  error_while_fetching_initial_table: false,
  error_while_fetching_initial_data: false,
  city_to_search: '',
  snackbar: false,
  topTenUsersInCity: [],
  topUserIndividualProfiles: [],
}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case LOAD_MOST_POPULAR_USERS:
      console.log('RESP IN REDUCER ', state.topTenUsersInCity)
      return {
        ...state,
        loading: false,
        snackbar: false,
        topTenUsersInCity: actions.payload,
      }
    case ERROR_WHILE_FETCHING_INITIAL_TABLE:
      return {
        ...state,
        snackbar: actions.payload,
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
