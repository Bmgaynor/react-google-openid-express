import React, { Component } from 'react'
import { confirmLogin, getUserInfoFromJWT } from './utils/authorization'
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
          <h1 className='App-title'>Google OpenId React Express!</h1>
        </header>
        <p className='App-intro'>
          Welcome {this.state.user.given_name}
        </p>
        <p className='App-intro'>
          Checkout code on <a href='https://github.com/Bmgaynor/react-google-openid-express'>Github</a>
        </p>
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <Home />
    )
  }
}

export default App
