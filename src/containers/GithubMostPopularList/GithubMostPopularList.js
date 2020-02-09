/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import CholoSnackbar from '../../components_libs/CholoSnackbar'
import LoadingSpinner from '../../components_libs/LoadingSpinner'
import {
  loadMostPopularUsers,
  handleCityToSearchChange,
} from '../../actions/getUserActions'
import Button from '@material-ui/core/Button'
import Autosuggest from 'react-autosuggest'
import EachUserListItem from './EachUserListItem'
// import globalApi from '../../globalApi'
import countryCity from '../../utils/country-city-js'
import { defaultTheme } from 'react-autosuggest/dist/theme'
import axios from 'axios'
import { useStyles } from './GithubMostPopularListStyles'
const omit = require('lodash.omit')

const getEachUserGivenId = (id, index) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/users/${id}`).then(res => {
      let userData = res.data
      let result = omit(userData, ['created_at', 'updated_at'])
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

const escapeRegexCharacters = str => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim())
  if (escapedValue === '') {
    return []
  }
  const regex = new RegExp('^' + escapedValue, 'i')
  return countryCity.filter(language => regex.test(language.name))
}

const getSuggestionValue = suggestion => {
  return suggestion.name
}

const renderSuggestion = suggestion => {
  return <span>{suggestion.name}</span>
}

const GithubMostPopularList = () => {
  const globalStore = useSelector(state => state.globalStore)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState([])
  const [snackbar, setSnackbar] = useState(false)
  const [initialLoadingErrSnackbar, setInitialLoadingErrSnackbar] = useState(
    false,
  )
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const closeSnackbar = () => setSnackbar(false)

  // useEffect(() => {
  //   dispatch(loadMostPopularUsers())
  //   setInitialLoadingErrSnackbar(globalStore.snackbar)
  // }, [globalStore.snackbar, dispatch])

  // const getCityData = city => dispatch(loadMostPopularUsers(city))

  const getAllUserProfilesFromIds = () => {
    const userIds = globalStore.topTenUsersInCity.map(i => i.login)
    setIsLoading(true)
    console.log('ALL USERS ID ', userIds)
    let topStories = userIds.map(getEachUserGivenId)
    let results = Promise.all(topStories)
    results
      .then(res => {
        console.log('ALL INDIVIDUAL USERS ', res.data)
        setFetchedData(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadAllData = () => {
    const city = globalStore.city_to_search
    dispatch(loadMostPopularUsers(city))
  }

  const onChange = (event, { newValue, method }) => {
    dispatch(handleCityToSearchChange(newValue))
    setValue(newValue)
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const inputProps = {
    placeholder: 'Start typing your city name',
    value,
    onChange: onChange,
  }

  return (
    <div className={classes.container}>
      <div className={classes.tableAndFabContainer}>
        {/* {isLoading ? (
          <div className={classes.spinner}>
            <LoadingSpinner />
          </div>
        ) : ( */}
        <div className={classes.table}>
          {/* {console.log('VALUE IS ', globalStore.city_to_search)} */}
          {console.log(
            'TOP 10 IN COMP ',
            JSON.stringify(globalStore.topTenUsersInCity),
          )}
          <div className={classes.inputandButtonContainer}>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              theme={{
                ...defaultTheme,
                container: classes.react_autosuggest__container,
                input: classes.react_autosuggest__input,
                inputOpen: classes.react_autosuggest__input__open,
                inputFocused: classes.react_autosuggest__input__focused,
                suggestionsContainer:
                  classes.react_autosuggest__suggestions_container,
                suggestionsContainerOpen:
                  classes.react_autosuggest__suggestions_container__open,
                suggestionsList: classes.react_autosuggest__suggestions_list,
                suggestion: classes.react_autosuggest__suggestion,
                suggestionHighlighted:
                  classes.react_autosuggest__suggestion__highlighted,
              }}
            />
            <Button
              onClick={loadAllData}
              variant="contained"
              size="large"
              color="primary"
              disabled={globalStore.city_to_search === ''}
            >
              <Typography
                variant="h3"
                className={classes.modalButtonLabelEnabled}
              >
                Load City Data
              </Typography>
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <EachUserListItem></EachUserListItem>
          </div>
        </div>
        {/* ) */}
        }
        <CholoSnackbar
          open={
            snackbar === true ||
            typeof snackbar === 'object' ||
            initialLoadingErrSnackbar ===
              'Error occurred while loading Initial data'
          }
          variant="error"
          message={
            // eslint-disable-next-line no-nested-ternary
            initialLoadingErrSnackbar ===
            'Error occurred while loading Initial Data'
              ? 'Error occurred while loading Initial Data'
              : snackbar && snackbar._id
              ? `${snackbar && snackbar.name} was successfully edited`
              : `${snackbar && snackbar.name} was successfully added`
          }
          onClose={closeSnackbar}
        />
      </div>
    </div>
  )
}

GithubMostPopularList.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default GithubMostPopularList
