import React from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'

import {
  LABEL_BTN_BACK,
  LABEL_BTN_CLOSE,
  LABEL_CD_CHAMADO,
  LABEL_DT_ABERTURA,
  LABEL_OBS,
  LABEL_PERFORMANCE_EVALUATION,
  MESSAGE_NOT_SELECT_PERFORMANCE
} from './constants'

import { AppContext } from '../../../core/Contexts/AppContext'
import { LOADING, NOT_LOADING } from '../../../core/Reducers/constants'
import { closeTicket } from './ticketsController'
import { Loading } from '../../../core/Utils/components/Loading'

export class CloseTicket extends React.Component {
  static contextType = AppContext

  state = {
    ticket: {},
    quality: 0
  }

  componentDidMount() {
    this.setState({ ticket: this.props.value.ticket })
  }

  async onClose() {
    const { token } = this.context.stateUser.session
    this.context.dispatchUtils({ type: LOADING })
    if (this.state.quality === 0) alert(MESSAGE_NOT_SELECT_PERFORMANCE)
    const { result } = await closeTicket({
      token,
      nCdChamado: this.state.ticket.CD_CHAMADO,
      avaliacao: this.state.quality
    })
    this.context.dispatchUtils({ type: NOT_LOADING })
    if (result) this.props.value.onBack()
  }

  render() {
    const { isLoading } = this.context.stateUtils
    if (isLoading) return <Loading />
    const date = new Date(this.state.ticket.DT_ABERTURA).toLocaleDateString()
    const hour = new Date(this.state.ticket.DT_ABERTURA).toLocaleTimeString()
    return (
      <Container className="m-3">
        <Form>
          <br />
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              {LABEL_CD_CHAMADO}
            </InputGroup.Text>
            <Form.Control
              disabled
              readOnly
              placeholder={this.state.ticket.CD_CHAMADO}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              {LABEL_DT_ABERTURA}
            </InputGroup.Text>
            <Form.Control disabled readOnly placeholder={`${date} ${hour}`} />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>{LABEL_OBS}</InputGroup.Text>
            <Form.Control
              as="textarea"
              value={this.state.ticket.OBS}
              disabled
              readOnly
            />
          </InputGroup>
          <div className="mb-3">
            <Form.Label>{LABEL_PERFORMANCE_EVALUATION}</Form.Label>
            <Form.Check
              name="group1"
              label="1 - Péssimo"
              type="radio"
              id="radio-1"
              value={1}
              onChange={e => {
                this.setState({ quality: e.target.value })
              }}
            />
            <Form.Check
              name="group1"
              label="2 - Ruim"
              type="radio"
              id="radio-2"
              value={2}
              onChange={e => {
                this.setState({ quality: e.target.value })
              }}
            />
            <Form.Check
              name="group1"
              label="3 - Mediano"
              type="radio"
              id="radio-3"
              value={3}
              onChange={e => {
                this.setState({ quality: e.target.value })
              }}
            />
            <Form.Check
              name="group1"
              label="4 - Bom"
              type="radio"
              id="radio-4"
              value={4}
              onChange={e => {
                this.setState({ quality: e.target.value })
              }}
            />
            <Form.Check
              name="group1"
              label="5 - Ótimo"
              type="radio"
              id="radio-5"
              value={5}
              onChange={e => {
                this.setState({ quality: e.target.value })
              }}
            />
          </div>
        </Form>
        <Button
          className="m-1"
          variant="primary"
          onClick={() => this.onClose()}
        >
          {LABEL_BTN_CLOSE}
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
