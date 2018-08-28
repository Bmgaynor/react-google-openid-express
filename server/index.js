const express = require('express')
const app = express()

const homeURI = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'YOUR_DOMAIN'
const redirectUri = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/authorized' : 'YOUR_DOMAIN/landing'

app.use(express.static('build'))

app.use('/api/test', (req, res) => {
  res.json('up')
})
// app.use('*', (req, res) => {
//   res.send()
// })

app.set('port', (process.env.PORT || 8080))

app.listen(app.get('port'), function () {
  console.log('Node app is running at localhost:' + app.get('port'))
})
