import React from 'react'
import PropTypes from 'prop-types'
import { mount, shallow } from 'enzyme'
import expect from 'expect'
import { createShallow, createMount } from '@material-ui/core/test-utils'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import GithubMostPopularList from '../GithubMostPopularList'
import EachUserListItem from '../EachUserListItem'
import { createStore } from 'redux'

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureMockStore(middlewares)

describe('GithubMostPopularList Component', () => {
  let shallow

  // beforeAll(() => {
  //   shallow = createShallow()
  // })

  //

  it('should render a startup component if startup is not complete', () => {
    const store = mockStore({
      startup: { topTenUsersInCity: [] },
    })

    const wrapper = mount(
      <Provider store={store}>
        <GithubMostPopularList />
      </Provider>,
    )
    expect(wrapper.find('EachUserListItem').length).toEqual(1)
  })
  //

  // Wrapping component to properly mount Redux connected component
  // const MyProvider = props => {
  //   const { children } = props

  //   // return <Provider store={mockStore}>{children}</Provider>
  //   return (
  //     <Provider store={mockStore}>
  //       <GithubMostPopularList />
  //     </Provider>
  //   )
  // }

  // MyProvider.propTypes = {
  //   children: PropTypes.node.isRequired,
  //   store: PropTypes.object,
  // }

  /*  it('renders', () => {
    const mount = createMount()

    const wrapper = mount(<GithubMostPopularList store={mockStore} />, {
      wrappingComponent: MyProvider,
    })

    expect(wrapper.find(EachUserListItem)).toHaveLength(1)
  })

  it('should render without throwing an error', () => {
    const wrapper = shallow(<GithubMostPopularList store={mockStore} />).dive()
    expect(wrapper.exists()).toBe(true)
  })

  it('should match Snapshot', () => {
    const wrapper = shallow(<GithubMostPopularList store={mockStore} />).dive()
    expect(wrapper).toMatchSnapshot()
  }) */
})
