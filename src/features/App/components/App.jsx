import React from 'react'

import { AppRoutes } from '../../../core/Routes'

import './App.css'

export class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      initialState: {}
    }
  }

  render() {
    return (
      <AppRoutes initialState={this.state.initialState} />
    )
  }
}
