import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { GlobalContext } from '../Context'

import { Login } from '../../features/Login'
import { NotFound } from '../../features/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export class AppRoutes extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      initialState: {}
    }
  }

  render() {
    return(
      <GlobalContext initialState={this.state.initialState}>
        <RouterProvider router={router} />
      </GlobalContext>
    )
  }
}
