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
import { loadInitialUsers } from '../../actions/getUserActions'
// import globalApi from '../../globalApi'

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

}))

const GithubMostPopularList = () => {
  const globalStore = useSelector(state => state.globalStore)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [snackbar, setSnackbar] = useState(false)
  const [initialLoadingErrSnackbar, setInitialLoadingErrSnackbar] = useState(false)

  const closeSnackbar = () => setSnackbar(false)

  useEffect(() => {
    dispatch(loadInitialUsers())
    setInitialLoadingErrSnackbar(globalStore.snackbar)
  }, [globalStore.snackbar, dispatch])


  return (
    <div className={classes.container}>
      {console.log('GITHUB USER ', JSON.stringify(globalStore.githubUser))}
      <div className={classes.tableAndFabContainer}>
        {globalStore.loading ? (
          <div className={classes.spinner}>
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            paul
          </div>
        )}


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
