const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = '485938632670-kd8gsiinti71qm7rlhnd68hulumbh8d9.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID)

// https://developers.google.com/identity/one-tap/web/idtoken-auth
async function verify (token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  })
  const payload = ticket.getPayload()
  return payload
}

app.use(express.static('build'))
app.use(cookieParser())
app.use(async (req, res, next) => {
  // read cookie parse jwt and add email to req.user
  try {
    if (req.query.id_token) {
      console.log('jwt found in query')
      req.user = await verify(req.query.id_token)
      console.log('setting jwt to cookie')
      res.cookie('JWT', req.query.id_token)
    } else if (req.cookies.JWT) {
      console.log('cookie found')
      req.user = await verify(req.cookies.JWT)
    } else {
      console.log('no user found')
    }
  } catch (e) {
    console.log(e)
  }
  return next()
})

app.use('/api/health', (req, res) => {
  if (!req.user) {
    res.sendStatus(401)
  } else {
    res.json({status: 'up'})
  }
})

app.post('/api/authorized', async (req, res) => {
  if (!req.user) {
    res.sendStatus(401)
  } else {
    res.json({status: 'up'})
  }
})

if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
}

app.use((req, res) => {
  console.log('url not found: ', req.originalUrl)
  res.sendStatus(400)
})

module.exports = app
