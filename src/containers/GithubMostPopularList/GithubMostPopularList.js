/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import CholoSnackbar from '../../components_libs/CholoSnackbar'
import LoadingSpinner from '../../components_libs/LoadingSpinner'
import { loadMostPopularUsers, handleCityToSearchChange } from '../../actions/getUserActions'
import Button from '@material-ui/core/Button'
import Autosuggest from 'react-autosuggest';
// import globalApi from '../../globalApi'
import countryCity from '../../utils/country-city-js'
import { defaultTheme } from 'react-autosuggest/dist/theme';


function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return countryCity.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    margin: 'auto',
    backgroundColor: theme.background.default,
  },
  tableAndFabContainer: {
    position: 'relative',
    margin: 'auto',
    maxWidth: '1400px',
    minHeight: 'calc(100vh - 100px)',
    alignItems: 'center ',
    justifyContent: 'centert',
    verticalAlign: 'middle t',
    textAlign: 'center',
  },
  table: {
    backgroundColor: theme.background.paper,
    borderRadius: theme.shape.borderRadius,
    paddingBottom: '100px',
    alignItems: 'center ',
    justifyContent: 'center ',
    verticalAlign: 'middle ',
    textAlign: 'center',
  },

  inputandButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center ',
    justifyContent: 'center ',
  },
  react_autosuggest__container: {
    "position": "relative",
    "height": "30px",
    "marginRight": "10px",
  },
  react_autosuggest__input: {
    "width": "240px",
    "height": "30px",
    "padding": "10px 20px",
    fontFamily: 'Montserrat',
    "fontWeight": "300",
    "fontSize": "16px",
    "border": "1px solid #aaa",
    "borderRadius": "4px",

  },
  react_autosuggest__input__focused: {
    "outline": "none"
  },
  react_autosuggest__input__open: {
    "borderBottomLeftRadius": "0",
    "borderBottomRightRadius": "0"
  },
  react_autosuggest__suggestions_container: {
    "display": "none"
  },
  react_autosuggest__suggestions_container__open: {
    "display": "block",
    "position": "absolute",
    "left": 0,
    "top": "51px",
    "width": "280px",
    "border": "1px solid #aaa",
    "backgroundColor": "#fff",
    fontFamily: 'Montserrat',
    "fontWeight": "300",
    "fontSize": "16px",
    "borderBottomLeftRadius": "4px",
    "borderBottomRightRadius": "4px",
    "zIndex": "2"
  },
  react_autosuggest__suggestions_list: {
    "margin": "0",
    "padding": "0",
    "listStyleType": "none",
  },
  react_autosuggest__suggestion: {
    "cursor": "pointer",
    "padding": "10px 20px"
  },
  react_autosuggest__suggestion__highlighted: {
    "backgroundColor": "#ddd"
  }

}))

const GithubMostPopularList = () => {
  const globalStore = useSelector(state => state.globalStore)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [snackbar, setSnackbar] = useState(false)
  const [initialLoadingErrSnackbar, setInitialLoadingErrSnackbar] = useState(false)
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const closeSnackbar = () => setSnackbar(false)

  // useEffect(() => {
  //   dispatch(loadMostPopularUsers())
  //   setInitialLoadingErrSnackbar(globalStore.snackbar)
  // }, [globalStore.snackbar, dispatch])

  const getCityData = city =>  dispatch(loadMostPopularUsers(city))

  const onChange = (event, { newValue, method }) => {
    dispatch(handleCityToSearchChange(newValue))
    setValue(newValue)

  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))

  };

  const  onSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const inputProps = {
    placeholder: "Start typing your city name",
    value,
    onChange: onChange,
  };


  return (
    <div className={classes.container}>
      {/* {console.log('Top 10 GITHUB USERs ', JSON.stringify(globalStore.topTenUsersInCity))} */}
      <div className={classes.tableAndFabContainer}>
        {globalStore.loading ? (
          <div className={classes.spinner}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={classes.table}>
          {/* {console.log('VALUE IS ', globalStore.city_to_search)} */}
          {console.log('TOP 10 IN COMP ', globalStore.topTenUsersInCity)}
          <div className={classes.inputandButtonContainer} >
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
                suggestionsContainer: classes.react_autosuggest__suggestions_container,
                suggestionsContainerOpen: classes.react_autosuggest__suggestions_container__open,
                suggestionsList: classes.react_autosuggest__suggestions_list,
                suggestion: classes.react_autosuggest__suggestion,
                suggestionHighlighted: classes.react_autosuggest__suggestion__highlighted,
                }
              }
          />
          <Button
          onClick={() => {
            const city = globalStore.city_to_search
            getCityData(city)
            }
            }
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
          </div>
        )
        }


        <CholoSnackbar
          open={
            snackbar === true ||
            typeof snackbar === 'object' ||
            initialLoadingErrSnackbar === 'Error occurred while loading Initial data'
          }
          variant="error"
          message={
            // eslint-disable-next-line no-nested-ternary
            initialLoadingErrSnackbar === 'Error occurred while loading Initial Data'
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
