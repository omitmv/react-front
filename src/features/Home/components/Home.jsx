/* eslint-disable no-unsafe-negation */
import React from 'react'
import { Navigate } from 'react-router-dom'

import './Home.css'

import AppNavbar from '../../AppNavbar/components/AppNavbar'
import { Menu } from '../../Menu'

import { AppContext } from '../../../core/Contexts/AppContext'

export class Home extends React.Component {
  static contextType = AppContext

  state = {
    videoStream: null
  }

  render() {
    const { auth } = this.context.stateUser.session

    if (auth) {
      return (
        <div className="bodyHome">
          <AppNavbar />
          <Menu />
        </div>
      )
    } else {
      return <Navigate to="/login" replace />
    }
  }
}
