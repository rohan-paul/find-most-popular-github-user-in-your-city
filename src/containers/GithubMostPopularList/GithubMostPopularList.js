/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import GlobalSnackbar from '../../components_libs/GlobalSnackbar'
import LoadingSpinner from '../../components_libs/LoadingSpinner'
import {
  loadMostPopularUsers,
  handleCityToSearchChange,
  handleSnackBarStatus,
} from '../../actions/getUserActions'
import Button from '@material-ui/core/Button'
import Autosuggest from 'react-autosuggest'
import EachUserListItem from './EachUserListItem'
import cityList from '../../utils/country-city-js'
import { defaultTheme } from 'react-autosuggest/dist/theme'
import { useStyles } from './GithubMostPopularListStyles'

const escapeRegexCharacters = str => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim())
  if (escapedValue === '') {
    return []
  }
  const regex = new RegExp('^' + escapedValue, 'i')
  return cityList.filter(language => regex.test(language.name))
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
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const closeSnackbar = () => dispatch(handleSnackBarStatus(false))

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
        {globalStore.loading ? (
          <div className={classes.spinner}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={classes.table}>
            {console.log('SNACKBAR ', globalStore.snackbar)}
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
        )}
        <GlobalSnackbar
          open={
            globalStore.snackbar === true ||
            typeof globalStore.snackbar === 'object' ||
            typeof globalStore.snackbar === 'string' ||
              globalStore.snackbar instanceof String
          }
          variant="error"
          message={'Error occurred while loading Initial Data'}
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
