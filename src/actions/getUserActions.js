/* eslint-disable import/prefer-default-export */
import {
  LOADING,
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
      let result = pick(userData, ['login', 'bio', 'email', 'name', 'id'])
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

const mergeArraysCondionally = (topUsers, userProfiles) => {
  let merged = []

  // First return the first array with only elements whose id matches with an element's id from the second array
  topUsers.every(i =>
    userProfiles.map(j => j.id).includes(i.id) ? merged.push(i) : null,
  )

  // Now that I have got two separate arrays of matched and the original array, simply merge the matched array (on the basis of ID) with the original array containing the data.
  merged = merged.map(i =>
    Object.assign(
      i,
      userProfiles.find(j => j.id === i.id),
    ),
  )
  return merged
}

export const loadMostPopularUsers = city => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    })
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
          dispatch({
            type: LOAD_MOST_POPULAR_USERS,
            payload: {
              topTenUsersInCity: mergeArraysCondionally(topTenUsersInCity, res),
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
