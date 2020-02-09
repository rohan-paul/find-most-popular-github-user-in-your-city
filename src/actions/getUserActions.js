/* eslint-disable import/prefer-default-export */
import {
  LOAD_MOST_POPULAR_USERS,
  ERROR_WHILE_FETCHING_INITIAL_TABLE,
  CITY_TO_SEARCH,
} from './types'
// import globalApi from '../globalApi'

import axios from 'axios'
const pick = require('lodash.pick')
const map = require('lodash.map')
const partialRight = require('lodash.partialright')

const headers = {
  'Content-Type': 'application/json',
}

const getEachUserGivenId = (id, index) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/users/${id}`).then(res => {
      let userData = res.data
      let result = pick(userData, ['login', 'bio', 'email', 'name'])
      if (
        result &&
        Object.entries(result).length !== 0 &&
        result.constructor === Object
      ) {
        resolve(result)
      } else {
        reject(new Error('No data received'))
      }
    })
  })
}

// export const loadMostPopularUsers = city => async dispatch => {
//   try {
//     const res = await globalApi.loadUser(city)
//     dispatch({
//       type: LOAD_MOST_POPULAR_USERS,
//       payload: res.data.items.slice(0, 10),
//     })
//   } catch (err) {
//     dispatch({
//       type: ERROR_WHILE_FETCHING_INITIAL_TABLE,
//       payload: 'Error occurred while loading Initial Data',
//     })
//   }
// }

export const loadMostPopularUsers = city => async dispatch => {
  try {
    axios({
      method: 'get',
      url: `https://api.github.com/search/users?q=location%3A${city}&followers%3A%3E%3D1000&ref=searchresults&s=followers&type=Users`,
      headers,
    }).then(res => {
      const resData = res.data.items.slice(0, 10)
      var topTenUsersInCity = map(
        resData,
        partialRight(pick, ['login', 'id', 'avatar_url']),
      )

      const userIds = topTenUsersInCity.map(i => i.login)
      // setIsLoading(true)
      console.log('ALL USERS ID ', userIds)
      let topTenUserProfiles = userIds.map(getEachUserGivenId)
      let topUserIndividualProfiles = Promise.all(topTenUserProfiles)
      topUserIndividualProfiles
        .then(res => {
          console.log('ALL INDIVIDUAL USERS ', JSON.stringify(res))
          // setFetchedData(res.data)
          // setIsLoading(false)
          // dispatch({
          //   type: LOAD_MOST_POPULAR_USERS,
          //   payload: topTenUsersInCity,
          // })
          dispatch({
            type: LOAD_MOST_POPULAR_USERS,
            payload: {
              topTenUsersInCity,
              topUserIndividualProfiles: res,
            },
          })
        })
        .catch(err => {
          console.log(err)
        })
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
