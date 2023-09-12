import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { AppContext } from '../../../core/Contexts/AppContext'
import { LOADING, NOT_LOADING } from '../../../core/Reducers/constants'
import { insertNewTicket, listGroup, listSubGroup } from './ticketsController'
import {
  LABEL_BTN_BACK,
  LABEL_BTN_OPEN,
  LABEL_GROUP,
  LABEL_OBS,
  LABEL_SUB_GROUP,
  MESSAGE_GROUP_NOT_SELECTED,
  MESSAGE_OBS_EMPTY,
  MESSAGE_SUB_GROUP_NOT_SELECTED
} from './constants'
import { Loading } from '../../../core/Utils/components/Loading'

export class NewTicket extends React.Component {
  static contextType = AppContext
  state = {
    groups: [],
    groupSelected: 0,
    subGroups: [],
    subGroupSelected: 0,
    obs: ''
  }

  componentDidMount() {
    this.fetchGroups()
  }

  async fetchGroups() {
    this.context.dispatchUtils({ type: LOADING })
    const { token } = this.context.stateUser.session
    const { result } = await listGroup(token)
    this.setState({
      groups: result.rows
    })
    this.context.dispatchUtils({ type: NOT_LOADING })
  }

  async fetchSubGroups(selected) {
    this.context.dispatchUtils({ type: LOADING })
    this.setState({ groupSelected: selected })
    const { token } = this.context.stateUser.session
    const { result } = await listSubGroup({ token, nCdGrupo: selected })
    this.setState({
      subGroups: result.rows
    })
    this.context.dispatchUtils({ type: NOT_LOADING })
  }

  async insertNewTicket() {
    this.context.dispatchUtils({ type: LOADING })
    if (this.state.groupSelected === 0) alert(MESSAGE_GROUP_NOT_SELECTED)
    if (this.state.subGroupSelected === 0) alert(MESSAGE_SUB_GROUP_NOT_SELECTED)
    if (this.state.obs.trim() === '') alert(MESSAGE_OBS_EMPTY)
    const { token } = this.context.stateUser.session
    const { result } = await insertNewTicket({
      token,
      nCdSubGrupo: this.state.subGroupSelected,
      nCdUsuarioAbertura: this.context.stateUser.user.CD_USUARIO,
      cObs: this.state.obs.trim()
    })
    this.context.dispatchUtils({ type: NOT_LOADING })
    if (result === true) this.props.value.onBack()
  }

  render() {
    const { isLoading } = this.context.stateUtils
    if (isLoading) return <Loading />
    return (
      <Container>
        <Form>
          <Form.Label>{LABEL_GROUP}</Form.Label>
          <Form.Select
            aria-label={LABEL_GROUP}
            onChange={e => this.fetchSubGroups(e.target.value)}
          >
            <option key={0} value={0}></option>{' '}
            {this.state.groups.map(item => {
              return (
                <option key={item.CD_GRUPO} value={item.CD_GRUPO}>
                  {item.DS_GRUPO}
                </option>
              )
            })}
          </Form.Select>
          <Form.Label>{LABEL_SUB_GROUP}</Form.Label>
          <Form.Select
            aria-label={LABEL_SUB_GROUP}
            onChange={e => this.setState({ subGroupSelected: e.target.value })}
          >
            <option key={0} value={0}></option>{' '}
            {this.state.subGroups.map(item => {
              return (
                <option key={item.CD_SUB_GRUPO} value={item.CD_SUB_GRUPO}>
                  {item.DS_SUB_GRUPO}
                </option>
              )
            })}
          </Form.Select>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{LABEL_OBS}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={this.state.obs}
              onChange={e => this.setState({ obs: e.target.value })}
            />
          </Form.Group>
        </Form>
        <Button
          className="m-1"
          variant="primary"
          onClick={() => this.insertNewTicket()}
        >
          {LABEL_BTN_OPEN}
        </Button>
        <Button
          className="m-1"
          variant="danger"
          onClick={() => this.props.value.onBack()}
        >
          {LABEL_BTN_BACK}
        </Button>
      </Container>
    )
  }
}
