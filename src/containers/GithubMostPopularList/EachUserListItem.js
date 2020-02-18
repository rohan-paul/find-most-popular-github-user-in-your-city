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
  eachUserContainerEven: {
    width: '100%',
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.background.paper,
    borderBottomWidth: '0.5px !important',
    borderBottom: '0.5px solid grey',
  },
  eachUserContainerOdd: {
    width: '100%',
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.secondary.light,
    borderBottomWidth: '0.5px !important',
    borderBottom: '0.5px solid grey',
  },
  imageClass: {
    width: '25px',
    height: '25px',
  },
  listItem: {
    marginLeft: '80px',
  },
  avatar: {
    width: '60px',
    height: '70px',
  },
}))

const EachUserListItem = ({ currentCityShown }) => {
  const globalStore = useSelector(state => state.globalStore)
  const classes = useStyles()

  return (
    <List dense className={classes.root}>
      {globalStore.topTenUsersInCity.map((item, index) => {
        const labelId = `checkbox-list-secondary-label-${item}`
        return (
          <div
            className={
              index % 2
                ? classes.eachUserContainerOdd
                : classes.eachUserContainerEven
            }
          >
            <ListItem key={item.id} button>
              <ListItemAvatar>
                <Avatar
                  className={classes.avatar}
                  alt={`Avatar n°${item + 1}`}
                  src={item.avatar_url}
                />
              </ListItemAvatar>
              <div style={{ marginLeft: '15px' }}>
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
              <div
                style={{
                  marginLeft: '102px',
                }}
              >
                <Typography variant="h3">
                  Total Stars Received
                  <ListItemText id={labelId} primary={item.totalUserStars} />
                  {/* <Typography variant="overline">
                    {item.totalUserStars}
                  </Typography> */}
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

              <div
                style={{
                  marginLeft: '70px',
                }}
              >
                <Typography variant="h4">
                  Bio
                  <ListItemText id={labelId} primary={item.bio} />
                </Typography>
              </div>
            </ListItem>
            <ListItem>
              <div
                style={{
                  marginLeft: '70px',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <img
                  className={classes.imageClass}
                  src={require('../../assets/images/location.png')}
                  alt=""
                />
                <Typography>{currentCityShown}</Typography>
              </div>
              <div style={{ marginLeft: '55px' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <img
                    className={classes.imageClass}
                    src={require('../../assets/images/email.png')}
                    alt=""
                  />
                  <ListItemText
                    id={labelId}
                    primary={
                      item.email === null ? 'Email not accessible' : item.email
                    }
                  />
                </div>
              </div>
            </ListItem>
          </div>
        )
      })}
    </List>
  )
}

export default EachUserListItem
