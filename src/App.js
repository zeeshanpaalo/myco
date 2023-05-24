import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [user, setLoginUser] = useState({})
  const [error, setError] = useState(null)

  // login handler
  const loginHandler = () => {
    // call post login
    return axios
      .post('http://localhost:4000/login', {
        email,
        password: pass,
      })
      .then(function (response) {
        console.log(response)
        sessionStorage.setItem('auth_token', response.data.auth_token)
        // setLoginUser(response)
      })
      .catch(function (error) {
        console.log(error)
        sessionStorage.removeItem('auth_token')
      })
  }

  const verifyToken = () => {
    return axios
      .post('http://localhost:4000/verify', {
        auth_token: sessionStorage.getItem('auth_token'),
      })
      .then(function (response) {
        setLoginUser(response.data)
        alert('TOken valid')
      })
      .catch(function (error) {
        setError('login not sucessfull')
        alert('Token INvalid')
      })
  }
  return (
    <div>
      <input
        placeholder="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      ></input>
      <input
        placeholder="password"
        name="pass"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        type="password"
      ></input>
      <button onClick={loginHandler}>Login</button>

      <br />
      <button onClick={verifyToken}>Verify Token</button>
    </div>
  )
}

export default App
