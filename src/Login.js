import React from 'react'

const clientId = '485938632670-kd8gsiinti71qm7rlhnd68hulumbh8d9.apps.googleusercontent.com'
const buildRedirectUrl = (clientId, redirectUri) => {
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=id_token&scope=openid%20email%20profile&redirect_uri=${redirectUri}&nonce=0394852-3190485-2490358`
}

const redirectUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'PRODUCTION_URL'
class Login extends React.Component {
  constructor (props) {
    const googleRedirectUrl = buildRedirectUrl(clientId, redirectUrl)
    window.location = googleRedirectUrl
    super(props)
  }
  render () {
    return (
      <div>Redirecting to google auth</div>
    )
  }
}

export default Login
