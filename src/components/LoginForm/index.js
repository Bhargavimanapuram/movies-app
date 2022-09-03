import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isFailure: false,
    errorMsg: '',
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    const {username, password} = this.state
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    Cookies.set('username', username, {
      expires: 30,
    })
    Cookies.set('password', password, {
      expires: 30,
    })
    history.replace('/')
  }

  onFailureLogin = data => {
    this.setState({errorMsg: data.error_msg, isFailure: true})
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data)
    }
  }

  renderInputUsername = () => {
    const {username} = this.state
    return (
      <>
        <label className="movies-app-login-label-element" htmlFor="loginInput">
          USERNAME
        </label>
        <input
          onChange={this.onChangeUsername}
          value={username}
          className="movies-app-login-input-element"
          id="loginInput"
          placeholder="Username"
          type="text"
        />
      </>
    )
  }

  renderInputPassword = () => {
    const {password} = this.state
    return (
      <>
        <label
          className="movies-app-login-label-element"
          htmlFor="loginPassword"
        >
          PASSWORD
        </label>
        <input
          onChange={this.onChangePassword}
          value={password}
          className="movies-app-login-input-element password-input-element"
          id="loginPassword"
          placeholder="Password"
          type="password"
        />
      </>
    )
  }

  render() {
    const {isFailure, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="movies-app-login-section-bg">
        <img
          className="login-page-logo"
          alt="login website logo"
          src="https://res.cloudinary.com/dxgpp8aab/image/upload/v1661755511/Group_7399login-page-mobile-logo_txozqj.png"
        />
        <div className="movies-app-login-content-container">
          <div className="movies-app-login-container">
            <h1 className="movies-app-login-heading">Login</h1>
            <form
              className="movies-app-login-form-container"
              onSubmit={this.onSubmitUserDetails}
            >
              <div className="movies-app-login-input-container">
                {this.renderInputUsername()}
              </div>
              <div className="movies-app-login-input-container">
                {this.renderInputPassword()}
              </div>
              {isFailure && (
                <p className="movies-app-login-error-msg">{errorMsg}</p>
              )}
              <button className="movies-app-screen-login-button" type="submit">
                Login
              </button>
              <button className="movies-app-mobile-login-button" type="submit">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm
