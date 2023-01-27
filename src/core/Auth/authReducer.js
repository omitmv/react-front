import { Reducer } from '../Context/components/reducer'
import { SIGN_IN } from './constants'

export class AuthReducer extends Reducer {
    constructor() {
        super('auth', {
            user: null,
            appSession: null
        })
    }

    reduce(state, { type, payload }) {
        switch (type) {
            case SIGN_IN:
                const { user, appSession } = payload
                return {...state, user, appSession }
            default:
                return state
        }
    }
}