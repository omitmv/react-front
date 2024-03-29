import React from 'react'
import { Navigate } from 'react-router-dom'

import './Login.css'
import FormLogin from './FormLogin'

import { AppContext } from '../../../core/Contexts/AppContext'

export class Login extends React.Component {
  static contextType = AppContext

  render() {
    const { auth } = this.context.stateUser.session
    if (auth) {
      return <Navigate to="/" replace />
    } else {
      return (
        <>
          <FormLogin />
        </>
      )
    }
  }
}
