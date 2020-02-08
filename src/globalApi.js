/* eslint-disable no-underscore-dangle */
import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
}

const loadUser = async city =>
  axios({
    method: 'get',
    url: `https://api.github.com/search/users?q=location%3A${city}&followers%3A%3E%3D1000&ref=searchresults&s=followers&type=Users`,
    headers,
  })

export default {
  loadUser,
}
