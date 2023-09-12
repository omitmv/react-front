import { Col, Container, Row } from 'react-bootstrap'

import { ButtonMenu } from './ButtonMenu'
import {
  LABEL_SETTINGS,
  LABEL_TICKETS,
  LABEL_TRACKER,
  PATH_SETTINGS,
  PATH_TICKETS,
  PATH_TRACKER
} from './constants'

import tickets from '../assets/mao-segurando-medico.svg'
import tracker from '../assets/rota.svg'
import settings from '../assets/engrenagens.svg'

export const Menu = () => {
  return (
    <>
      <Container>
        <Row>
          <Col className="m-3 p-0" style={{ textAlign: 'center' }}>
            <ButtonMenu
              value={LABEL_SETTINGS}
              path={PATH_SETTINGS}
              srcImage={settings}
            />
            <ButtonMenu
              value={LABEL_TICKETS}
              path={PATH_TICKETS}
              srcImage={tickets}
            />
            <ButtonMenu
              value={LABEL_TRACKER}
              path={PATH_TRACKER}
              srcImage={tracker}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}
