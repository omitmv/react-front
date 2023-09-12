import { UPD_API_RESPONSE } from './constants'

export const apiResponseInitialState = {
  codigo: null,
  message: '',
  result: {}
}

export const apiResponseReducer = (state, action) => {
  switch (action.type) {
    case UPD_API_RESPONSE: {
      const { codigo, message, result } = action.result
      return { ...state, codigo, message, result }
    }
    default: {
      return state
    }
  }
}
