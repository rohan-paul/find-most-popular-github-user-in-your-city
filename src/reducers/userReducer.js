import {
  LOAD_INITIAL_TABLE,
  ERROR_WHILE_FETCHING_INITIAL_TABLE,
} from '../actions/types'

const initialState = {
  loading: true,
  error_while_fetching_initial_table: false,
  error_while_fetching_initial_data: false,
  snackbar: false,
  githubUser: {
    name: '',
  },
}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case LOAD_INITIAL_TABLE:
      return {
        ...state,
        loading: false,
        snackbar: false,
        githubUser: actions.payload,
      }
    case ERROR_WHILE_FETCHING_INITIAL_TABLE:
      return {
        ...state,
        snackbar: actions.payload,
      }

    default:
      return state
  }
}
