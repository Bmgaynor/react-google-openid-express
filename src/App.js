import React, { Component } from 'react'
import Login from './Login'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { confirmLogin, getUserInfoFromJWT } from './utils/authorization'
import Patrick from 'patricks-react-hello-world'
import './App.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        email: '',
        picture: '',
        given_name: '',
        family_name: ''
      }
    }
  }
  componentDidMount () {
    confirmLogin().then(() => {
      const user = getUserInfoFromJWT()
      if (user) {
        this.setState({
          user: user
        })
      }
    })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={this.state.user.picture} className='App-logo' alt='face' />
          <h1 className='App-title'>=</h1>
        </header>
        <p className='App-intro'>
          Welcome {this.state.user.given_name} <Patrick />
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
