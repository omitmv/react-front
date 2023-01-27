import { AuthReducer } from '../../Auth/authReducer'

export class ReducersController {
    reducers = [new AuthReducer()]

    callReducer(state = {}, action) {
        for (const instance of this.reducers) {
            const { name, reduce, initialState } = instance

            if (this.isResetStateAction(name, action)) {
                state[name] = initialState
                continue
            }

            state[name] = reduce(state[name] || initialState, action)
        }

        this.persistStoreOnDevServer(state)

        return state
    }

    isResetStateAction(name, { type }) {
        const isResetStateAction = []
        const persistStateNames = []
        const isPersistState = persistStateNames.includes(name)
        return !isPersistState && isResetStateAction.includes(type)
    }

    persistStoreOnDevServer(state) {
        if (process.env.NODE_ENV === 'development') {
            localStorage.setItem('store', JSON.stringify(state))
        }
    }
}