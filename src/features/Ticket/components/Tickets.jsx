import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { When } from 'react-if'
import { Navigate } from 'react-router-dom'

import { LABEL_BTN_ADD } from './constants'
import './Tickets.css'
import { InteractTicket } from './InteractTicket'
import { CloseTicket } from './CloseTicket'
import { NewTicket } from './NewTicket'
import { TicketItem } from './TicketItem'
import {
  cancelTicket,
  listTickets,
  listTicketsAttendant
} from './ticketsController'

import AppNavbar from '../../AppNavbar/components/AppNavbar'

import { AppContext } from '../../../core/Contexts/AppContext'
import { LOADING, NOT_LOADING } from '../../../core/Reducers/constants'
import { Loading } from '../../../core/Utils/components/Loading'

export class Tickets extends React.Component {
  static contextType = AppContext
  timer
  state = {
    timerRefresh: 30 * 1000,
    isNewTicket: false,
    isInteract: false,
    isList: true,
    isCloseTicket: false,
    listTickets: [],
    ticketSelected: null
  }

  async componentDidMount() {
    this.context.dispatchUtils({ type: LOADING })
    await this.refreshTickets()
    this.timer = setInterval(async () => {
      if (this.state.isList) {
        this.context.dispatchUtils({ type: LOADING })
        await this.refreshTickets()
        this.context.dispatchUtils({ type: NOT_LOADING })
      }
    }, this.state.timerRefresh)
    this.context.dispatchUtils({ type: NOT_LOADING })
    var heightPage = document.body.scrollHeight
    window.scrollTo(0, heightPage)
  }

  async refreshTickets() {
    const { user, session } = this.context.stateUser
    let value = null
    if (this.context.stateUser.user.FL_ATENDENTE === 'S') {
      value = await listTicketsAttendant(session.token)
    } else {
      value = await listTickets(session.token, user.CD_USUARIO)
    }
    const list = value.result.filter(
      item =>
        item.DT_FECHAMENTO === null &&
        item.FL_ATIVO === 'S' &&
        item.DT_FECHAMENTO_TEMPORARIO === null
    )
    this.setState({ listTickets: list })
  }

  onInteract(ticketSelected) {
    this.setState({
      isInteract: true,
      isList: false,
      ticketSelected,
      isNewTicket: false
    })
  }

  async onTicketCancel(ticketSelected) {
    this.context.dispatchUtils({ type: LOADING })
    const { token } = this.context.stateUser.session
    const { result } = await cancelTicket(token, ticketSelected)
    if (result) await this.refreshTickets()
    this.context.dispatchUtils({ type: NOT_LOADING })
    var heightPage = document.body.scrollHeight
    window.scrollTo(0, heightPage)
  }

  async onTicketClose(ticketSelected) {
    this.setState({
      isInteract: false,
      isList: false,
      isNewTicket: false,
      isCloseTicket: true,
      ticketSelected
    })
  }

  renderTickets() {
    const { listTickets } = this.state
    listTickets.sort((a, b) => a.CD_CHAMADO - b.CD_CHAMADO)
    return listTickets.map(item => {
      return (
        <TicketItem
          key={item.CD_CHAMADO}
          value={{
            DT_ABERTURA: item.DT_ABERTURA,
            CD_CHAMADO: item.CD_CHAMADO,
            OBS: item.OBS,
            background: item.STATUS === 1 ? 'light' : 'danger',
            isAttendant: this.context.stateUser.user.FL_ATENDENTE === 'N',
            onInteract: value => this.onInteract(value),
            onTicketClose: () => this.onTicketClose(item),
            onTicketCancel: value => this.onTicketCancel(value)
          }}
        />
      )
    })
  }

  renderListEmpty() {
    return (
      <>
        <center>
          <h1>Não há itens.</h1>
        </center>
      </>
    )
  }

  async newTicket() {
    this.setState({
      isInteract: false,
      isList: false,
      isNewTicket: true,
      isCloseTicket: false
    })
  }

  async backToList() {
    this.context.dispatchUtils({ type: LOADING })
    this.setState({
      isInteract: false,
      isList: true,
      isNewTicket: false,
      isCloseTicket: false
    })
    await this.refreshTickets()
    this.context.dispatchUtils({ type: NOT_LOADING })
    var heightPage = document.body.scrollHeight
    window.scrollTo(0, heightPage)
  }

  render() {
    const { isLoading } = this.context.stateUtils
    if (isLoading) return <Loading />

    const { FL_ATENDENTE } = this.context.stateUser.user
    const { auth } = this.context.stateUser.session
    const {
      isInteract,
      isList,
      isNewTicket,
      isCloseTicket,
      listTickets,
      ticketSelected
    } = this.state

    if (auth) {
      return (
        <div className="bodyTickets">
          <AppNavbar />
          <When condition={isCloseTicket}>
            <CloseTicket
              value={{
                ticket: ticketSelected,
                onBack: () => this.backToList()
              }}
            />
          </When>
          <When condition={isNewTicket}>
            <NewTicket value={{ onBack: () => this.backToList() }} />
          </When>
          <When condition={isInteract}>
            <InteractTicket
              value={{
                nCdChamado: ticketSelected,
                onBack: () => this.backToList()
              }}
            />
          </When>
          <When condition={isList}>
            <Container>
              {FL_ATENDENTE === 'N' ? (
                <Button
                  className="btnAdd m-3"
                  variant="primary"
                  onClick={() => this.newTicket()}
                >
                  {LABEL_BTN_ADD}
                </Button>
              ) : (
                ''
              )}
              {listTickets.length > 0
                ? this.renderTickets()
                : this.renderListEmpty()}
            </Container>
          </When>
        </div>
      )
    } else {
      return <Navigate to="/login" replace />
    }
  }
}
