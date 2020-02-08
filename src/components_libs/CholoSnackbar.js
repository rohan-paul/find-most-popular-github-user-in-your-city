import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import PropTypes from 'prop-types'
import CholoSnackbarContent from './CholoSnackbarContent'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(4),
  },
}))

const CholoSnackbar = ({ open, onClose, message, variant }) => {
  const classes = useStyles()

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={8000}
      onClose={onClose}
    >
      <CholoSnackbarContent
        onClose={onClose}
        variant={variant}
        className={classes.margin}
        message={message}
      />
    </Snackbar>
  )
}

CholoSnackbar.defaultProps = {
  open: false,
  onClose: () => {},
  message: 'Unknown error',
  variant: 'warning',
}

CholoSnackbar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string,
  variant: PropTypes.string,
}

export default CholoSnackbar
