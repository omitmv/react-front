export const listTickets = async(token, nCdUsuario) => {
    let response = null
    try {
        await fetch(
                `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/ticket/list`, {
                    method: 'POST',
                    body: JSON.stringify({ nCdUsuario }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'x-access-token': token
                    }
                }
            )
            .then(res => {
                response = res.json()
            })
            .catch(err => {
                throw new Error(err)
            })
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const listDetailsTicket = async(token, nCdChamado) => {
    let response = null
    try {
        await fetch(
                `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/ticket/listDetail`, {
                    method: 'POST',
                    body: JSON.stringify({ nCdChamado }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'x-access-token': token
                    }
                }
            )
            .then(res => {
                response = res.json()
            })
            .catch(err => {
                throw new Error(err)
            })
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const cancelTicket = async(token, nCdChamado) => {
    let response = null
    try {
        await fetch(
                `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/ticket/cancelTicket`, {
                    method: 'POST',
                    body: JSON.stringify({ nCdChamado }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'x-access-token': token
                    }
                }
            )
            .then(res => {
                response = res.json()
            })
            .catch(err => {
                throw new Error(err)
            })
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const insertTicketDetail = async value => {
    const { token, nCdChamado, nCdUsuario, cObs } = value
    let response = null
    try {
        await fetch(
                `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/ticket/insertTicketDetail`, {
                    method: 'POST',
                    body: JSON.stringify({ nCdChamado, nCdUsuario, cObs }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'x-access-token': token
                    }
                }
            )
            .then(res => {
                response = res.json()
            })
            .catch(err => {
                throw new Error(err)
            })
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const listTicketsAttendant = async token => {
    let response = null
    try {
        await fetch(
                `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/ticket/listTicketsAttendant`, {
                    method: 'POST',
                    body: JSON.stringify(),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'x-access-token': token
                    }
                }
            )
            .then(res => {
                response = res.json()
            })
            .catch(err => {
                throw new Error(err)
            })
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const listGroup = async token => {
    let response = null
    try {
        await fetch(
                `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/ticket/listGroup`, {
                    method: 'POST',
                    body: JSON.stringify(),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'x-access-token': token
                    }
                }
            )
            .then(res => {
                response = res.json()
            })
            .catch(err => {
                throw new Error(err)
            })
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const listSubGroup = async value => {
    const { token, nCdGrupo } = value
    let response = null
    try {
        await fetch(
                `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/ticket/listSubGroup`, {
                    method: 'POST',
                    body: JSON.stringify({ nCdGrupo }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'x-access-token': token
                    }
                }
            )
            .then(res => {
                response = res.json()
            })
            .catch(err => {
                throw new Error(err)
            })
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const insertNewTicket = async value => {
    const { token, nCdSubGrupo, nCdUsuarioAbertura, cObs } = value
    let response = null
    try {
        await fetch(
                `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/ticket/insertNewTicket`, {
                    method: 'POST',
                    body: JSON.stringify({ nCdSubGrupo, nCdUsuarioAbertura, cObs }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'x-access-token': token
                    }
                }
            )
            .then(res => {
                response = res.json()
            })
            .catch(err => {
                throw new Error(err)
            })
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const closeTicket = async value => {
    const { token, nCdChamado, avaliacao } = value
    let response = null
    try {
        await fetch(
                `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/ticket/closeTicket`, {
                    method: 'POST',
                    body: JSON.stringify({ nCdChamado, avaliacao }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'x-access-token': token
                    }
                }
            )
            .then(res => {
                response = res.json()
            })
            .catch(err => {
                throw new Error(err)
            })
        return response
    } catch (e) {
        throw new Error(e)
    }
}