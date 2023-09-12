import { UPD_USER, UPD_SESSION, USER_LOGOFF } from './constants'

export const userInitialState = {
  user: {
    LOGIN: '',
    FL_ADMIN: '',
    FL_ATENDENTE: '',
    DT_CADASTRO: '',
    CD_USUARIO: null,
    NOME: '',
    IDADE: null
  },
  session: {
    auth: false,
    token: ''
  }
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case UPD_USER: {
      const { user } = action.payload
      return { ...state, user }
    }
    case UPD_SESSION: {
      const {
        result: { auth, token }
      } = action.payload
      return { ...state, session: { auth, token } }
    }
    case USER_LOGOFF: {
      return userInitialState
    }
    default: {
      return state
    }
  }
}
