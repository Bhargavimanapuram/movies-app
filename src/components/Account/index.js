import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    Cookies.remove('password')
    Cookies.remove('username')
    history.replace('/login')
  }

  const renderAccountDetails = () => {
    const username = Cookies.get('username')
    const password = Cookies.get('password')
    const lengthOfPassword = password.length
    const maskedPassword = '*'.repeat(lengthOfPassword)
    return (
      <div className="account-details-content-container">
        <h1>Account</h1>
        <hr className="horizontal-line" />
        <div className="credentials-container">
          <p className="membership-text">Member Ship</p>
          <div className="name-password-container">
            <p className="username-text">{username}</p>
            <p className="password-text">Password :{maskedPassword}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="features-container">
          <p className="membership-text">Plan details</p>
          <p className="premium-text">Premium</p>
          <p className="ultra-hd-text">Ultra HD</p>
        </div>
        <div className="logout-button-container">
          <button
            onClick={onClickLogoutButton}
            className="logout-button"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="account-page-container">
      <Header />
      <div className="account-details-container">{renderAccountDetails()}</div>
      <Footer />
    </div>
  )
}
export default Account
