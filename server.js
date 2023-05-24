const express = require('express')
const app = express()

app.get('/login', function (req, res) {
  res.send('Hello World')
})

app.get('/signup', function (req, res) {
  res.send('Hello World')
})

app.get('*', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)