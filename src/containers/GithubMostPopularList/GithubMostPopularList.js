/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable-next-line react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { normalize, schema } from "normalizr"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"
import GlobalSnackbar from "../../components_libs/GlobalSnackbar"
import LoadingSpinner from "../../components_libs/LoadingSpinner"
import {
  loadMostPopularUsers,
  handleCityToSearchChange,
  handleSnackBarStatus,
} from "../../actions/getUserActions"
import Button from "@material-ui/core/Button"
import Autosuggest from "react-autosuggest"
import EachUserListItem from "./EachUserListItem"
import cityList from "../../utils/country-city-js"
import { defaultTheme } from "react-autosuggest/dist/theme"
import { useStyles } from "./GithubMostPopularListStyles"
import TablePagination from "@material-ui/core/TablePagination"

const escapeRegexCharacters = str => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim())
  if (escapedValue === "") {
    return []
  }
  const regex = new RegExp("^" + escapedValue, "i")
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
  const [value, setValue] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [currentCityShown, setcurrentCityShown] = useState("")

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  useEffect(() => {
    dispatch(loadMostPopularUsers(currentCityShown, page, rowsPerPage))
  }, [currentCityShown, dispatch, page, rowsPerPage])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const closeSnackbar = () => dispatch(handleSnackBarStatus(false))

  const loadAllData = () => {
    const city = globalStore.city_to_search
    setcurrentCityShown(city)
    dispatch(loadMostPopularUsers(city, page, rowsPerPage))
  }

  const onChange = (event, { newValue, method }) => {
    dispatch(handleCityToSearchChange(newValue))
    setValue(newValue)
  }

  const justTesting = () => console.log("Testing")

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const inputProps = {
    placeholder: "Start typing your city name",
    value,
    onChange: onChange,
  }

  // ***********
  // The below code is just for my completely unrelated notes on normalizr package. As this code was not running in a plain .js file

  const articlesData = {
    articles: [
      {
        id: 1,
        title: "Dagon",
        tags: [
          { id: 1, name: "old ones" },
          { id: 2, name: "short story" },
        ],
      },
      {
        id: 2,
        title: "Azathoth",
        tags: [
          { id: 1, name: "old ones" },
          { id: 3, name: "novel" },
        ],
      },
      {
        id: 3,
        title: "At the Mountains of Madness",
        tags: [
          { id: 4, name: "insanity" },
          { id: 3, name: "novel" },
        ],
      },
    ],
  }

  const tag = new schema.Entity("tags", {})
  const article = new schema.Entity("articles", {
    tags: [tag],
  })

  // We assume articlesData is the (parsed) JSON object that we got
  const normalizedData = normalize(articlesData, { articles: [article] })

  console.log("normalizr data is ", normalizedData)
  // ***********

  return (
    <div className={classes.container}>
      <div className={classes.tableAndFabContainer}>
        {/* {console.log("PAGE ", page)} */}
        {globalStore.loading ? (
          <div className={classes.spinner}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={classes.table}>
            {/* {console.log("SNACKBAR ", globalStore.snackbar)} */}
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
                disabled={globalStore.city_to_search === ""}
              >
                <Typography
                  variant="h3"
                  className={classes.modalButtonLabelEnabled}
                >
                  Load City Data
                </Typography>
              </Button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <EachUserListItem
                currentCityShown={currentCityShown}
              ></EachUserListItem>
            </div>
          </div>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={globalStore.totalNoOfUsersFromAPI}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <GlobalSnackbar
          open={
            globalStore.snackbar === true ||
            typeof globalStore.snackbar === "object" ||
            typeof globalStore.snackbar === "string" ||
            globalStore.snackbar instanceof String
          }
          variant="error"
          message={"Error occurred while loading Initial Data"}
          onClose={closeSnackbar}
        />
      </div>
    </div>
  )
}

GithubMostPopularList.propTypes = {
  onClose: PropTypes.func,
}

export default GithubMostPopularList
