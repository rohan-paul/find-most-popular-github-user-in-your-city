import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

const EachUserListItem = () => {
  const globalStore = useSelector(state => state.globalStore)
  // const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <List dense className={classes.root}>
      {globalStore.topTenUsersInCity.map((item, index) => {
        const labelId = `checkbox-list-secondary-label-${item}`
        return (
          <>
            <ListItem key={item.id} button>
              <ListItemAvatar>
                <Avatar alt={`Avatar n°${item + 1}`} src={item.avatar_url} />
              </ListItemAvatar>
              <div>
                <Typography variant="h1">
                  <ListItemText id={labelId} primary={item.login} />
                </Typography>
              </div>
            </ListItem>
            <ListItem key={item} button>
              <div style={{ marginLeft: '50px' }}>
                <ListItemText id={labelId} primary={item.name} />
              </div>
              <div style={{ marginLeft: '50px' }}>
                <ListItemText id={labelId} primary={item.bio} />
              </div>
              <div style={{ marginLeft: '50px' }}>
                <ListItemText
                  id={labelId}
                  primary={
                    item.email === null ? 'Email not accessible' : item.email
                  }
                />
              </div>
            </ListItem>
          </>
        )
      })}
    </List>
  )
}

export default EachUserListItem
