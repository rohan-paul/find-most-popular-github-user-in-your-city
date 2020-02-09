/* eslint-disable import/prefer-default-export */
import {
  LOAD_MOST_POPULAR_USERS,
  ERROR_WHILE_FETCHING_INITIAL_TABLE,
  CITY_TO_SEARCH,
} from './types'
import globalApi from '../globalApi'

export const loadMostPopularUsers = city => async dispatch => {
  try {
    const res = await globalApi.loadUser(city)
    dispatch({
      type: LOAD_MOST_POPULAR_USERS,
      payload: res.data.items.slice(0, 10),
    })
  } catch (err) {
    dispatch({
      type: ERROR_WHILE_FETCHING_INITIAL_TABLE,
      payload: 'Error occurred while loading Initial Data',
    })
  }
}

export const handleCityToSearchChange = city => {
  return {
    type: CITY_TO_SEARCH,
    payload: city,
  }
}
