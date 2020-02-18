import React from 'react'
import renderer from 'react-test-renderer'
// import { MuiThemeProvider } from 'styled-components'
import { MuiThemeProvider } from '@material-ui/core/styles'
import globalTheme from '../../../globalTheme'
import PropTypes from 'prop-types'
import { mount, shallow } from 'enzyme'
import expect from 'expect'
import { createShallow, createMount } from '@material-ui/core/test-utils'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import GithubMostPopularList from '../GithubMostPopularList'
import EachUserListItem from '../EachUserListItem'

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureMockStore(middlewares)

const store = mockStore({
  globalStore: {
    loading: false,
    error_while_fetching_initial_table: false,
    error_while_fetching_initial_data: false,
    city_to_search: '',
    snackbar: false,
    topTenUsersInCity: [],
    totalNoOfUsersFromAPI: 0,
  },
})

describe('GithubMostPopularList Component', () => {
  it('should match snapshot', () => {
    const matches = (children, theme = globalTheme) =>
      expect(
        renderer
          .create(
            <MuiThemeProvider theme={globalTheme}>{children}</MuiThemeProvider>,
          )
          .toJSON(),
      ).toMatchSnapshot()
  })

  it('should render a startup component if startup is not complete', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={globalTheme}>
          <GithubMostPopularList />
        </MuiThemeProvider>
      </Provider>,
    )
    expect(wrapper.find('EachUserListItem').length).toEqual(1)
  })
})
