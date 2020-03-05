/* eslint-disable import/prefer-default-export */
import {
  LOADING,
  LOAD_MOST_POPULAR_USERS,
  ERROR_WHILE_FETCHING_INITIAL_TABLE,
  CITY_TO_SEARCH,
  SNACKBAR_STATUS,
} from "./types"

import axios from "axios"
const pick = require("lodash.pick")
const map = require("lodash.map")
const partialRight = require("lodash.partialright")

const headers = {
  "Content-Type": "application/json",
}

export const handleSnackBarStatus = bool => {
  return {
    type: SNACKBAR_STATUS,
    payload: bool,
  }
}

const getEachUserGivenId = (id, index) => {
  return new Promise((resolve, reject) => {
    axios
      .all([
        axios.get(`https://api.github.com/users/${id}`),
        axios.get(`https://api.github.com/users/${id}/repos?per_page=200`),
      ])
      .then(
        axios.spread((userProfile, userRepo) => {
          let userProfileData = userProfile.data
          const totalUserStars = userRepo.data
            .map(i => i.stargazers_count)
            .reduce((total, item) => total + item)
          let result = pick(userProfileData, [
            "login",
            "bio",
            "email",
            "name",
            "id",
          ])
          let modifiedResult = Object.assign(result, {
            totalUserStars: totalUserStars,
          })
          if (
            result &&
            Object.entries(modifiedResult).length !== 0 &&
            result.constructor === Object
          ) {
            resolve(modifiedResult)
          } else {
            reject(new Error("No data received"))
          }
        }),
      )
      .catch(err => {
        console.log("HIT the ERROR")
      })
  })
}

// Util function to merge to topUsers array data with userProfiles array, as they are coming from two different api calls
const mergeArraysConditionally = (topUsers, userProfiles) => {
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

export const loadMostPopularUsers = (
  city,
  page,
  numbersToFetch,
) => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    })
    axios({
      method: "get",
      // url: `https://api.github.com/search/users?q=location%3A${city}&followers%3A%3E%3D1000&ref=searchresults&s=followers&type=Users`,
      url: `https://api.github.com/search/users?q=location:${city}`,
      headers,
    })
      .then(async res => {
        const totalNoOfUsersFromAPI = res.data.items.length
        const start = page * numbersToFetch
        const end = start + numbersToFetch
        const resData = res.data.items.slice(start, end)
        var topTenUsersInCity = map(
          resData,
          partialRight(pick, ["login", "id", "avatar_url"]),
        )

        const userIds = topTenUsersInCity.map(i => i.login)
        let topTenUserProfiles = await userIds.map(getEachUserGivenId)
        let topUserIndividualProfiles = Promise.all(topTenUserProfiles)
        /* Note, I can use then() method and the catch() method on this promise which is returned from Promise.all. The then() method gets an array of all the resolved values, [5, 1, 'foo'] in this case. The catch() method gets the value of the first rejected Promise,  */
        topUserIndividualProfiles
          .then(res => {
            dispatch({
              type: LOAD_MOST_POPULAR_USERS,
              payload: {
                topTenUsersInCity: mergeArraysConditionally(
                  topTenUsersInCity,
                  res,
                ),
                totalNoOfUsersFromAPI,
              },
            })
          })
          .catch(err => {
            dispatch({
              type: ERROR_WHILE_FETCHING_INITIAL_TABLE,
              payload: "Error occurred while loading Initial Data",
            })
          })
      })
      .catch(err => {
        dispatch({
          type: ERROR_WHILE_FETCHING_INITIAL_TABLE,
          payload: "Error occurred while loading Initial Data",
        })
      })
  } catch (err) {
    dispatch({
      type: ERROR_WHILE_FETCHING_INITIAL_TABLE,
      payload: "Error occurred while loading Initial Data",
    })
  }
}

export const handleCityToSearchChange = city => {
  return {
    type: CITY_TO_SEARCH,
    payload: city,
  }
}
