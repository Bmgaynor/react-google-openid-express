/* global fetch */
import jwtDecode from 'jwt-decode'
import jsCookie from 'js-cookie'

const clientId = '485938632670-kd8gsiinti71qm7rlhnd68hulumbh8d9.apps.googleusercontent.com'
const buildRedirectUrl = (clientId, redirectUri) => {
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=id_token&scope=openid%20email%20profile&redirect_uri=${redirectUri}&nonce=0394852-3190485-2490358`
}
const redirectUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://react-google-openid-express.now.sh'

export const gotToGoogleLogin = () => {
  window.location = buildRedirectUrl(clientId, redirectUrl)
}
export const getHashParams = () => {
  const hashParams = {}
  let e
  let r = /([^&;=]+)=?([^&;]*)/g
  let q = window.location.hash.substring(1)
  while (e = r.exec(q)) {  // eslint-disable-line
    hashParams[e[1]] = decodeURIComponent(e[2])
  }
  return hashParams
}

export const postAuthorization = (idToken) => fetch(`/api/authorized?id_token=${idToken}`, { method: 'Post' })
    .then((Response) => {
      if (Response.status === 200) {
        // remove auth token from url
        window.location.hash = ''
      }
    }).catch(err => {
      console.log(err)
    })

export const checkApiStatus = () => fetch('/api/health').then((Response) => {
  if (Response.status === 200) {
    console.log('here')
    console.log(Response.json())
  } else {
    console.log('no jwt found')
    gotToGoogleLogin()
  }
}).catch(err => {
  console.log(err)
})

export const getCookie = (name) => {
  return jsCookie.get(name)
}
export const getUserInfoFromJWT = () => {
  const jwt = getCookie('JWT')
  // todo: confrim its not expired
  if (!jwt) {
    return null
  } else {
    return jwtDecode(jwt)
  }
}

export const confirmLogin = () => {
  if (getUserInfoFromJWT()) {
    return Promise.resolve(true)
  }

  const hashParams = getHashParams()
  if (hashParams.id_token) {
    return postAuthorization(hashParams.id_token)
  } else {
    return checkApiStatus()
  }
}
