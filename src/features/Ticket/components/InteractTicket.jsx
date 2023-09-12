import { useContext, useEffect, useState } from 'react'
import { Button, Container, Toast, ToastContainer } from 'react-bootstrap'

import { ENTER_KEY, LABEL_BTN_BACK, LABEL_BTN_INTERACT } from './constants'
import { insertTicketDetail, listDetailsTicket } from './ticketsController'

import { AppContext } from '../../../core/Contexts/AppContext'
import { LOADING, NOT_LOADING } from '../../../core/Reducers/constants'
import { Else, If, Then } from 'react-if'
import { Loading } from '../../../core/Utils/components/Loading'

export const InteractTicket = props => {
  const context = useContext(AppContext)
  const { isLoading } = context.stateUtils
  const { onBack, nCdChamado } = props.value
  const [details, setDetails] = useState([])
  const [obs, setObs] = useState('')

  const refreshListDetail = async () => {
    const token = context.stateUser.session.token
    const { result } = await listDetailsTicket(token, nCdChamado)
    const resultOrder = result.sort(
      (a, b) => a.CD_CHAMADO_DETALHE - b.CD_CHAMADO_DETALHE
    )
    setDetails(resultOrder)
  }

  useEffect(() => {
    context.dispatchUtils({ type: LOADING })
    async function fetchData() {
      await refreshListDetail()
    }
    fetchData()
    context.dispatchUtils({ type: NOT_LOADING })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const listDetails = () => {
    const { user } = context.stateUser
    let position = ''
    let background = ''
    let userName = ''
    return details.map(detail => {
      const condidion = user.CD_USUARIO === detail.CD_USUARIO
      switch (condidion) {
        case true: {
          position = 'top-end'
          background = 'light'
          userName = user.LOGIN
          break
        }
        default: {
          position = 'start-end'
          background = 'light'
          userName = detail.LOGIN_USUARIO
          break
        }
      }
      return (
        <div
          aria-live="polite"
          aria-atomic="true"
          className="position-relative"
          style={{ minHeight: '10rem' }}
        >
          <ToastContainer
            position={position}
            className="p-2"
            style={{ zIndex: 1 }}
          >
            <Toast key={detail.CD_CHAMADO_DETALHE} bg={background}>
              <Toast.Header closeButton={false}>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">{userName}</strong>
                <small>{detail.DATA_DETALHE}</small>
              </Toast.Header>
              <Toast.Body>{detail.OBS}</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      )
    })
  }

  const onInteract = async () => {
    context.dispatchUtils({ type: LOADING })
    const token = context.stateUser.session.token
    const { CD_USUARIO } = context.stateUser.user
    const { result } = await insertTicketDetail({
      token,
      nCdChamado,
      nCdUsuario: CD_USUARIO,
      cObs: obs
    })
    if (result) {
      setObs('')
      await refreshListDetail()
    }
    context.dispatchUtils({ type: NOT_LOADING })
  }

  return (
    <If condition={isLoading}>
      <Then>
        <Loading />
      </Then>
      <Else>
        <Container>
          {listDetails()}
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Mensagem"
            value={obs}
            onKeyUp={event =>
              event.key === ENTER_KEY ? this.onInteract() : ''
            }
            onChange={e => setObs(e.target.value)}
          />
          <Button
            variant="primary"
            className="m-1"
            onClick={() => onInteract()}
          >
            {LABEL_BTN_INTERACT}
          </Button>
          <Button variant="danger" className="m-1" onClick={() => onBack()}>
            {LABEL_BTN_BACK}
          </Button>
        </Container>
      </Else>
    </If>
  )
}
