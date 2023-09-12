import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'

import { LABEL_HOME, LABEL_LOGOFF } from './constants'

import { AppContext } from '../../../core/Contexts/AppContext'
import { USER_LOGOFF } from '../../../core/Reducers/constants'
import withRouter from '../../../core/Routes/useNavigate'

class AppNavbar extends React.Component {
  static contextType = AppContext

  onHome = () => {
    const { navigate } = this.props
    navigate('/')
  }

  onLogoff = () => {
    this.context.dispatchUser({
      type: USER_LOGOFF
    })
  }

  renderButtonLogoff = () => {
    return (
      <Button
        onClick={() => {
          this.onLogoff()
        }}
      >
        {LABEL_LOGOFF}
      </Button>
    )
  }

  render() {
    const { auth } = this.context.stateUser.session

    return (
      <>
        <Navbar bg="dark" fixed="top">
          <Container>
            <Button onClick={() => this.onHome()}>{LABEL_HOME}</Button>
            {auth ? this.renderButtonLogoff() : ''}
          </Container>
        </Navbar>
      </>
    )
  }
}

export default withRouter(AppNavbar)
