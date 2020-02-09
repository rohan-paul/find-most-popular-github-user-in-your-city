import React from 'react'
import { useSelector } from 'react-redux'
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

    backgroundColor: theme.palette.background.paper,
  },
  eachUserContainer: {
    width: '100%',
    marginBottom: theme.spacing(3),
    backgroundColor: theme.background.paper,
    borderBottomWidth: '1px !important',
    borderBottom: '1px solid grey',
  },
  imageClass: {
    width: '25px',
    height: '25px',
  },
  listItem: {
    marginLeft: '50px',
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
          <div className={classes.eachUserContainer}>
            <ListItem key={item.id} button>
              <ListItemAvatar>
                <Avatar alt={`Avatar n°${item + 1}`} src={item.avatar_url} />
              </ListItemAvatar>
              <div>
                <Typography variant="h1">
                  <ListItemText>
                    <a
                      style={{ display: 'table-cell' }}
                      href={`https://github.com/${item.login}`}
                      target="_blank"
                    >
                      {item.login}
                    </a>
                  </ListItemText>
                </Typography>
              </div>
            </ListItem>
            <ListItem key={index} button>
              <div className={classes.listItem}>
                <Typography variant="h4">
                  Name
                  <ListItemText id={labelId} primary={item.name} />
                </Typography>
              </div>
              <div className={classes.listItem}>
                <Typography variant="h3">
                  Total Stars Received
                  <ListItemText id={labelId} primary={item.totalUserStars} />
                </Typography>
              </div>
              <div className={classes.listItem}>
                <Typography variant="h4">
                  Bio
                  <ListItemText id={labelId} primary={item.bio} />
                </Typography>
              </div>
              <div className={classes.listItem}>
                <ListItemText
                  id={labelId}
                  primary={
                    item.email === null ? 'Email not accessible' : item.email
                  }
                />
              </div>
            </ListItem>
            <ListItem>
              <div
                style={{
                  marginLeft: '50px',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <img
                  className={classes.imageClass}
                  src={require('../../assets/images/location.png')}
                  alt=""
                />
                <Typography>{globalStore.city_to_search}</Typography>
              </div>
            </ListItem>
          </div>
        )
      })}
    </List>
  )
}

export default EachUserListItem
