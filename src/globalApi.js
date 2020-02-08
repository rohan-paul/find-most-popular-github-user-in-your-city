/* eslint-disable no-underscore-dangle */
import axios from 'axios'
import config from './config'

const headers = {
  'Content-Type': 'application/json',
}

const loadUser = async () =>
  axios({
    method: 'get',
    url: config.url,
    headers,
  })


export default {
  loadUser,
}
