import md5 from 'md5'

export const callLogin = async (user, password) => {
  const pass = md5(password)
  const valueReq = btoa(`{"login":"${user}","pass":"${pass}"}`)
  const dataReq = { value: valueReq }
  let response = {}
  try {
    await fetch(
      `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/auth`,
      {
        method: 'POST',
        body: JSON.stringify(dataReq),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
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

export const fecthLogin = async cLogin => {
  let response = {}
  try {
    await fetch(
      `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/auth/getUserWithLogin`,
      {
        method: 'POST',
        body: JSON.stringify({ cLogin }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
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

export const makeNewPassword = length => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

export const alterPassword = async value => {
  const { nCdUsuario, newPassword } = value
  const cSenha = md5(newPassword)
  let response = {}
  try {
    await fetch(
      `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/utils/alterPassword`,
      {
        method: 'POST',
        body: JSON.stringify({ nCdUsuario, cSenha }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
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
