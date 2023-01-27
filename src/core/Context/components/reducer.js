export class Reducer {
    constructor(name, initialState) {
        this.name = name
        this.initialState = initialState
    }

    reduce() {
        throw new Error('method reducer was not implemented')
    }
}