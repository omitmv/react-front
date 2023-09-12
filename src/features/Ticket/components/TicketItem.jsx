import { Button, Card } from 'react-bootstrap'

import {
  LABEL_BTN_INTERACT,
  LABEL_BTN_CANCEL,
  LABEL_BTN_CLOSE
} from './constants'

export const TicketItem = props => {
  const {
    DT_ABERTURA,
    CD_CHAMADO,
    OBS,
    onInteract,
    onTicketCancel,
    background,
    onTicketClose,
    isAttendant
  } = props.value

  const renderButtonTicketClose = () => {
    if (isAttendant) {
      return (
        <Button
          className="m-1"
          variant="warning"
          onClick={() => {
            onTicketClose(CD_CHAMADO)
          }}
        >
          {LABEL_BTN_CLOSE}
        </Button>
      )
    }
  }

  const dataAbertura = value => {
    const objectDate = new Date(value)
    return `${objectDate.toLocaleDateString()} ${objectDate.toLocaleTimeString()}`
  }

  return (
    <Card bg={background} className="m-3">
      <Card.Header>
        {CD_CHAMADO} - {dataAbertura(DT_ABERTURA)}
      </Card.Header>
      <Card.Body>
        <Card.Text>{OBS}</Card.Text>
        <Button
          className="m-1"
          variant="primary"
          onClick={() => {
            onInteract(CD_CHAMADO)
          }}
        >
          {LABEL_BTN_INTERACT}
        </Button>
        {renderButtonTicketClose()}
        <Button
          className="m-1"
          variant="danger"
          onClick={() => {
            onTicketCancel(CD_CHAMADO)
          }}
        >
          {LABEL_BTN_CANCEL}
        </Button>
      </Card.Body>
    </Card>
  )
}
