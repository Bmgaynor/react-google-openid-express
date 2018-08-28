import React, { Component } from 'react'
import Login from './Login'
import logo from './logo.svg'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { confirmLogin } from './utils/authorization'
import './App.css'

class Home extends Component {
  componentDidMount () {
    confirmLogin()
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
