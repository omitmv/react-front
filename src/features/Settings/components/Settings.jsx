import React from 'react'
import { Container, Form } from 'react-bootstrap'

import { LABEL_ALTER } from './constants'
import './Settings.css'
import { alterData } from './settingsController'

import AppNavbar from '../../AppNavbar/components/AppNavbar'
import { AppContext } from '../../../core/Contexts/AppContext'
import { LOADING, NOT_LOADING } from '../../../core/Reducers/constants'
import withRouter from '../../../core/Routes/useNavigate'
import { Loading } from '../../../core/Utils'

class Settings extends React.Component {
  static contextType = AppContext
  state = {
    password: '',
    email: ''
  }

  componentDidMount() {
    this.context.dispatchUtils({ type: LOADING })
    this.setState({
      email: this.context.stateUser.user.EMAIL
    })
    this.context.dispatchUtils({ type: NOT_LOADING })
  }

  async alterData() {
    this.context.dispatchUtils({ type: LOADING })
    const { result } = await alterData(
      this.context.stateUser.user.CD_USUARIO,
      this.state.password,
      this.state.email,
      this.context.stateUser.session.token
    )
    if (result) {
      const { navigate } = this.props
      navigate('/')
    }
    this.context.dispatchUtils({ type: NOT_LOADING })
  }

  render() {
    const { isLoading } = this.context.stateUtils
    if (isLoading) return <Loading />
    if (this.context.stateUser.session.auth) {
      return (
        <div className="bodySettings">
          <AppNavbar />
          <Container className="m-3">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={e => this.setState({ email: e.target.value })}
                  value={this.state.email}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                  value={this.state.password}
                />
              </Form.Group>
            </Form>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.alterData()}
            >
              {LABEL_ALTER}
            </button>
          </Container>
        </div>
      )
    } else {
      const { navigate } = this.props
      navigate('/')
    }
  }
}

export default withRouter(Settings)
