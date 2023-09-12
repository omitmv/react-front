import md5 from 'md5'

export const alterData = async(nCdUsuario, password, email, token) => {
    const senha = md5(password)
    const dataReq = { nCdUsuario, senha, email }
    let response = null
    try {
        await fetch(
                `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/user/alterUser`, {
                    method: 'POST',
                    body: JSON.stringify(dataReq),
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