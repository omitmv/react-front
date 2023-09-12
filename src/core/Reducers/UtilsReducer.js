import { LOADING, NOT_LOADING } from './constants'

export const utilsInitialState = {
  isLoading: false
}

export const utilsReducer = (state, action) => {
  switch (action.type) {
    case LOADING: {
      return { ...state, isLoading: true }
    }
    case NOT_LOADING: {
      return { ...state, isLoading: false }
    }
    default: {
      return state
    }
  }
}
