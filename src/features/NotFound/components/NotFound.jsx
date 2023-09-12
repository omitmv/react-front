import React from 'react'
import { Container, Image } from 'react-bootstrap'

import './NotFound.css'

import AppNavbar from '../../AppNavbar/components/AppNavbar'

import { AppContext } from '../../../core/Contexts/AppContext'
import { NOT_LOADING } from '../../../core/Reducers/constants'

import img404 from '../assets/3793096.jpg'

export class NotFound extends React.Component {
  static contextType = AppContext

  componentDidMount() {
    this.context.dispatchUtils({ type: NOT_LOADING })
  }

  render() {
    return (
      <div className="bodyNotFound">
        <AppNavbar />
        <Container>
          <Image src={img404} fluid />
        </Container>
      </div>
    )
  }
}
