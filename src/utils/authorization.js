/* global fetch */
import jwtDecode from 'jwt-decode'
import jsCookie from 'js-cookie'

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
    window.location = '/login'
  }
}).catch(err => {
  console.log(err)
})

export const getCookie = (name) => {
  return jsCookie.get(name)
}
export const getUserInfoFromJWT = () => {
  const jwt = getCookie('JWT')
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
