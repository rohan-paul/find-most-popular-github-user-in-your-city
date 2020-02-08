/* eslint-disable import/prefer-default-export */
import { LOAD_INITIAL_TABLE, ERROR_WHILE_FETCHING_INITIAL_TABLE } from './types'
import globalApi from '../globalApi'

export const loadInitialUsers = () => async dispatch => {
  try {
    const res = await globalApi.loadUser()
    dispatch({
      type: LOAD_INITIAL_TABLE,
      payload: res.data.items.slice(0, 10),
    })
  } catch (err) {
    dispatch({
      type: ERROR_WHILE_FETCHING_INITIAL_TABLE,
      payload: 'Error occurred while loading Initial Data',
    })
  }
}
