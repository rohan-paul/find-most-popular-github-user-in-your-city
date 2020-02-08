/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Autosuggest from 'react-autosuggest';
import { defaultTheme } from 'react-autosuggest/dist/theme';

const useStyles = makeStyles(theme => ({
  container: {
    margin: 'auto',
    backgroundColor: theme.background.default,
  },
  innerTableContainer: {
    height: 'calc(100vh - 190px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.background.paper,
  },
  react_autosuggest__container: {
    "position": "relative",
    "width": "440px",

  },
  react_autosuggest__input: {
    "width": "240px",
    "height": "30px",
    "padding": "10px 20px",
    "fontFamily": "Helvetica, sans-serif",
    "fontWeight": "300",
    "fontSize": "16px",
    "border": "1px solid #aaa",
    "borderRadius": "4px"
  },
  react_autosuggest__input__focused: {
    "outline": "none"
  },
  react_autosuggest__input__open: {
    "borderBottomLeftRadius": "0",
    "borderBottomRightRadius": "0"
  },
  react_autosuggest__suggestions_container__open: {
    "display": "block",
    "position": "absolute",
    "top": "51px",
    "width": "280px",
    "border": "1px solid #aaa",
    "backgroundColor": "#fff",
    "fontFamily": "Helvetica, sans-serif",
    "fontWeight": "300",
    "fontSize": "16px",
    "borderBottomLeftRadius": "4px",
    "borderBottomRightRadius": "4px",
    "zIndex": "2"
  },
  react_autosuggest__suggestions_list: {
    "margin": "0",
    "padding": "0",
    "listStyleType": "none"
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

.....

.....

  return (
    <div className={classes.container}>
      {console.log('GITHUB USER ', JSON.stringify(globalStore.topTenUsersInCity))}
      <div className={classes.tableAndFabContainer}>
        {globalStore.loading ? (
          <div className={classes.spinner}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={classes.table}>
          {console.log('VALUE IS ', value)}
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

        </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GithubMostPopularList
