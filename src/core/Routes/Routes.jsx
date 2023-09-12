import React, { useReducer } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AppContext } from '../Contexts/AppContext'
import { userInitialState, userReducer } from '../Reducers/UserReducer'
import {
  apiResponseInitialState,
  apiResponseReducer
} from '../Reducers/ApiResponseReducer'
import { utilsInitialState, utilsReducer } from '../Reducers/UtilsReducer'

import { Home } from '../../features/Home'
import { Login } from '../../features/Login'
import { NotFound } from '../../features/NotFound'
import { Tickets } from '../../features/Ticket'
import { Tracker } from '../../features/Tracker'
import Settings from '../../features/Settings/components/Settings'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/tickets',
    element: <Tickets />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/tracker',
    element: <Tracker />
  },
  {
    path: '/settings',
    element: <Settings />
  }
])

export const AppRoutes = () => {
  const [stateApiResponse, dispatchApiResponse] = useReducer(
    apiResponseReducer,
    apiResponseInitialState
  )
  const [stateUser, dispatchUser] = useReducer(userReducer, userInitialState)
  const [stateUtils, dispatchUtils] = useReducer(
    utilsReducer,
    utilsInitialState
  )

  return (
    <AppContext.Provider
      value={{
        stateApiResponse,
        dispatchApiResponse,
        stateUser,
        dispatchUser,
        stateUtils,
        dispatchUtils
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}
