import React from 'react'
import { decodeToken } from 'react-jwt'

import './FormLogin.css'
import {
  alterPassword,
  callLogin,
  fecthLogin,
  makeNewPassword
} from './loginController'

import { AppContext } from '../../../core/Contexts/AppContext'
import {
  LOADING,
  NOT_LOADING,
  UPD_SESSION,
  UPD_USER
} from '../../../core/Reducers/constants'
import {
  ENTER_KEY,
  LABEL_BTN_LOGAR,
  LABEL_BTN_RECOVER_PASSWORD,
  LABEL_LOGIN,
  LABEL_SENHA,
  TITLE
} from './constants'
import { Loading, sendEmail } from '../../../core/Utils'

export default class FormLogin extends React.Component {
  static contextType = AppContext

  state = {
    login: '',
    pass: '',
    email: ''
  }

  async handleLogin() {
    try {
      this.context.dispatchUtils({ type: LOADING })
      const result = await callLogin(this.state.login, this.state.pass)
      if (result.result.auth) {
        this.context.dispatchUser({
          type: UPD_SESSION,
          payload: result
        })
        const user = decodeToken(result.result.token || '')
        this.context.dispatchUser({
          type: UPD_USER,
          payload: {
            user: user.userId
          }
        })
      }
      this.context.dispatchUtils({ type: NOT_LOADING })
    } catch (e) {
      this.context.dispatchUtils({ type: NOT_LOADING })
      console.log(e)
    }
  }

  async onRecoverPassword() {
    if (this.state.login.trim() === '') {
      alert('Campo login não informado.')
      return
    }
    this.context.dispatchUtils({ type: LOADING })
    try {
      const result = await fecthLogin(this.state.login)
      if (result.result.rows.length <= 0) {
        alert('Usuário informado não existe ou está inativado.')
      } else {
        this.setState({ email: result.result.rows[0].EMAIL })
        //Gerar senha temporária
        const newPassword = makeNewPassword(8)
        //Atualizar senha para senha temporária
        await alterPassword({
          nCdUsuario: result.result.rows[0].CD_USUARIO,
          newPassword
        })
        //Enviar senha temporária para e-mail
        await sendEmail(
          result.result.rows[0].EMAIL,
          `Senha temporária`,
          `Sua senha temporária é: ${newPassword}`
        )
        alert(`E-mail enviado para ${this.state.email}.`)
      }
    } catch (e) {
      this.context.dispatchUtils({ type: NOT_LOADING })
      console.log(e)
    }
    this.context.dispatchUtils({ type: NOT_LOADING })
  }

  render() {
    const { isLoading } = this.context.stateUtils
    if (isLoading) return <Loading />
    const { login, pass } = this.state

    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">{TITLE}</h3>
            <div className="form-group mt-3">
              <label>{LABEL_LOGIN}</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder={LABEL_LOGIN}
                value={login}
                onKeyUp={event =>
                  event.key === ENTER_KEY ? this.handleLogin() : ''
                }
                onChange={e =>
                  this.setState({ login: e.target.value.toUpperCase() })
                }
              />
            </div>
            <div className="form-group mt-3">
              <label>{LABEL_SENHA}</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder={LABEL_SENHA}
                value={pass}
                onKeyUp={event =>
                  event.key === ENTER_KEY ? this.handleLogin() : ''
                }
                onChange={e => this.setState({ pass: e.target.value })}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.handleLogin()}
              >
                {LABEL_BTN_LOGAR}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.onRecoverPassword()}
              >
                {LABEL_BTN_RECOVER_PASSWORD}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
