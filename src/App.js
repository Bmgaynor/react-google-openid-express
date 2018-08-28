/* global fetch */
import React, { Component } from 'react'
import Login from './Login'
import logo from './logo.svg'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './App.css'

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

class Home extends Component {
  componentDidMount () {
    const hashParams = getHashParams()
    if (hashParams.id_token) {
      fetch(`/api/authorized?id_token=${hashParams.id_token}`, { method: 'Post' })
        .then((Response) => {
          if (Response.status === 200) {
            console.log('here')
            window.location.hash = ''
          }
        }).catch(err => {
          console.log(err)
        })
    } else {
      fetch('/api/health').then((Response) => {
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
    }
  }
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>

          <hr />

          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
        </div>
      </Router>
    )
  }
}

export default App
