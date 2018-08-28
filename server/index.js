const app = require('./Server')

app.set('port', (process.env.PORT || 8080))

app.listen(app.get('port'), function () {
  console.log('Node app is running at localhost:' + app.get('port'))
})
