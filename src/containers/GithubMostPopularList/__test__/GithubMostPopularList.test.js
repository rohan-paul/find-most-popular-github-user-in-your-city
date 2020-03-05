import React from "react"
import renderer from "react-test-renderer"
// import { MuiThemeProvider } from 'styled-components'
import { MuiThemeProvider } from "@material-ui/core/styles"
import globalTheme from "../../../globalTheme"
import PropTypes from "prop-types"
import { mount, shallow } from "enzyme"
import expect from "expect"
import { createShallow, createMount } from "@material-ui/core/test-utils"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import GithubMostPopularList from "../GithubMostPopularList"
import EachUserListItem from "../EachUserListItem"
import {
  loadMostPopularUsers,
  handleCityToSearchChange,
  handleSnackBarStatus,
} from "../../../actions/getUserActions"
import Button from "@material-ui/core/Button"
import unwrap from "@material-ui/core/test-utils/unwrap"
// import { unwrap } from "@material-ui/core/test-utils"
import { useDispatch } from "react-redux"

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureMockStore(middlewares)

// const store = mockStore({
//   globalStore: {
//     loading: false,
//     error_while_fetching_initial_table: false,
//     error_while_fetching_initial_data: false,
//     city_to_search: '',
//     snackbar: false,
//     topTenUsersInCity: [],
//     totalNoOfUsersFromAPI: 0,
//   },
// })

describe("GithubMostPopularList Component", () => {
  let props
  let store
  let component
  let wrapperComp

  const fieldProps = {
    variant: "contained",
    size: "large",
    color: "primary",
    onClick: jest.fn(),
  }

  beforeEach(() => {
    /* Everything you pass into mockStore will be your Redux store's initial state. So make sure you provide everything that's needed by your connected React component to render without any problems. */
    store = mockStore({
      globalStore: {
        loading: false,
        error_while_fetching_initial_table: false,
        error_while_fetching_initial_data: false,
        city_to_search: "",
        snackbar: false,
        topTenUsersInCity: [],
        totalNoOfUsersFromAPI: 0,
      },
    })

    props = {
      users: {
        users: [],
        loading: false,
        error: false,
      },
    }

    store.dispatch = jest.fn()

    component = renderer.create(
      <Provider store={store}>
        <MuiThemeProvider theme={globalTheme}>
          <GithubMostPopularList />
        </MuiThemeProvider>
      </Provider>,
    )

    wrapperComp = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={globalTheme}>
          <GithubMostPopularList {...fieldProps} />
        </MuiThemeProvider>
      </Provider>,
    )
  })

  it("should render with given state from Redux store", () => {
    expect(component.toJSON()).toMatchSnapshot()
  })

  it("should render a startup component if startup is not complete", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={globalTheme}>
          <GithubMostPopularList />
        </MuiThemeProvider>
      </Provider>,
    )
    expect(wrapper.find("EachUserListItem").length).toEqual(1)
  })

  it("should render a startup component if startup is not complete", () => {
    const button = wrapperComp.find(Button).last()
    button.simulate("click")
    expect(
      wrapperComp
        .find(Button)
        .last()
        .props().disabled,
    ).toEqual(true)
  })

  it("should render a startup component if startup is not complete", () => {
    const button = wrapperComp.find(Button).last()
    button.simulate("click")
    expect(
      wrapperComp
        .find(Button)
        .last()
        .props().onClick,
    ).toBeDefined()
  })

  // it("should trigger onClick on on Button press", () => {
  //   let shallow
  //   shallow = createShallow()

  //   const wrapperComp = mount(
  //     <Provider store={store}>
  //       <MuiThemeProvider theme={globalTheme}>
  //         <GithubMostPopularList />
  //       </MuiThemeProvider>
  //     </Provider>,
  //   )

  //   const instance = wrapperComp.instance()

  //   const spy1 = jest.spyOn(instance, "justTesting")
  //   instance.forceUpdate()
  //   const button = wrapperComp.find(Button).last()
  //   button.simulate("click")
  //   wrapperComp.update()

  //   // expect(
  //   //   wrapperComp
  //   //     .find(Button)
  //   //     .last()
  //   //     .props().onClick,
  //   // ).toBeDefined()

  //   // expect(
  //   //   wrapperComp
  //   //     .find(Button)
  //   //     .last()
  //   //     .props().onClick,
  //   // ).toHaveBeenCalled()

  //   expect(spy1).toHaveBeenCalledTimes(1)
  // })

  // it("should trigger onClick on on Button press", () => {
  //   let shallow
  //   shallow = createShallow()

  //   jest.mock(`react-redux`, () => ({
  //     useDispatch: jest.fn(),
  //   }))

  //   // const spy1 = jest.fn()

  //   props.getUsers = jest.fn()

  //   // const spy1 = jest.spyOn(wrapperComp.instance(), "getUsers")

  //   const wrapperComp = mount(
  //     <Provider store={store}>
  //       <MuiThemeProvider theme={globalTheme}>
  //         <GithubMostPopularList {...props} />
  //       </MuiThemeProvider>
  //     </Provider>,
  //   )

  //   // const wrapperComp = shallow(<GithubMostPopularList {...props} />)

  //   const instance = wrapperComp.instance()

  //   const spy1 = jest.spyOn(instance, "getUsers")
  //   // instance.forceUpdate()

  //   // const app = mount(<wrapperComp />)

  //   const button = wrapperComp.find(Button).last()
  //   button.simulate("click")
  //   wrapperComp.update()

  //   expect(spy1).toHaveBeenCalledTimes(1)
  // })

  // *************************
  // it("calls the getUsers function when the button is clicked", () => {
  //   props.getUsers = jest.fn()
  //   const wrapper = shallow(<GithubMostPopularList {...props} />)
  //   const spy = jest.spyOn(wrapper.instance().props, "getUsers")

  //   wrapper.find(Button).simulate("click")
  //   expect(spy).toHaveBeenCalled()
  // })
})
