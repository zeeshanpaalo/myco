const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const { UserModel } = require('./models/User')

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser())

app.post('/login', async function (req, res) {
  console.log('logiinninin')
  const { email, password } = req.body
  console.log(req.body)
  // fetch user fromthe db.
  // unhash the pass.
  const user = await UserModel.findOne({ email }).lean()
  if (!user) {
    return res.status(404).send('No User Found')
  }
  // check for the pass; after unhashing
  if (password !== user.password) {
    return res.status(404).send('Invalid credentials')
  }
  // create a jwt and return inthe cookie.
  const token = jwt.sign(
    {
      data: user,
    },
    'my-secret', // load from env
    { expiresIn: '1h' },
  )

  res.status(200).send({ auth_token: token })
})

app.post('/verify', function (req, res) {
  let { auth_token } = req.body;
  console.log(auth_token);
  // verify: THis can be a middleware
  jwt.verify(auth_token, 'my-secret', function (err, decoded) {
    if (err) {
      return res.status(401).send('Not authenticated')
    }
    console.log(decoded) // bar
    return res.status(200).send(decoded)
  })
})

app.post('/signup', async function (req, res) {
  try {
    const { email, password } = req.body
    // will have some validation here.
    // hash the pass before saving ot db.
    const newUser = new UserModel({ email, password })
    await newUser.save()
    return res.status(200).send('sucess sigini up')
  } catch (e) {
    // handle errors
    return res.status(400).send('error signing up')
  }
})

app.get('*', function (req, res) {
  res.send('Hello World')
})

mongoose.connect('mongodb://127.0.0.1:27017/myco').then(() => {
  console.log('Connected!')
  app.listen(4000)
})
