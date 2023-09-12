export * from './components/Loading'

export const sendEmail = async (to, subject, bodyEmail) => {
  let response = null
  try {
    await fetch(
      `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/utils/sendEmail`,
      {
        method: 'POST',
        body: JSON.stringify({ to, subject, bodyEmail }),
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
