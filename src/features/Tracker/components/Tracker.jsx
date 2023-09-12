import React from 'react'
import { Navigate } from 'react-router-dom'

import './Tracker.css'

import AppNavbar from '../../AppNavbar/components/AppNavbar'

import { AppContext } from '../../../core/Contexts/AppContext'

export class Tracker extends React.Component {
  static contextType = AppContext

  render() {
    const { auth } = this.context.stateUser.session

    if (auth) {
      return (
        <>
          <div className="bodyTracker">
            <AppNavbar />
            <h1>Monitoramento</h1>
          </div>
        </>
      )
    } else {
      return <Navigate to="/login" replace />
    }
  }
}
