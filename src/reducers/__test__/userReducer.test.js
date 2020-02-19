import reducer from '../userReducer'
import expect from 'expect'

const initialState = {
  loading: false,
  error_while_fetching_initial_table: false,
  error_while_fetching_initial_data: false,
  city_to_search: '',
  snackbar: false,
  topTenUsersInCity: [],
  totalNoOfUsersFromAPI: 0,
}

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
})
