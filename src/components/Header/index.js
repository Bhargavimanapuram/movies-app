import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

let homeItemStyle
let popularItemStyle
let accountItemStyle

class Header extends Component {
  state = {
    showMenu: false,
  }

  onclickMenuOpen = () => {
    this.setState({
      showMenu: true,
    })
  }

  onClickCrossButton = () => {
    this.setState({
      showMenu: false,
    })
  }

  renderMenuItemsCard = () => (
    <div className="movie-page-nav-menu-mobile-container">
      <ul className="movie-page-nav-items-mobile-container">
        <Link className="nav-link" to="/">
          <li className={`movie-page-nav-items-screen ${homeItemStyle}`}>
            Home
          </li>
        </Link>
        <Link className="nav-link" to="/popular">
          <li className={`movie-page-nav-items-screen ${popularItemStyle}`}>
            Popular
          </li>
        </Link>
        <Link className="nav-link" to="/account">
          <li className={`movie-page-nav-items-screen ${accountItemStyle}`}>
            Account
          </li>
        </Link>
      </ul>
      <button
        onClick={this.onClickCrossButton}
        className="movies-page-nav-search-icon-button"
        type="button"
      >
        <AiFillCloseCircle className="movies-app-cross-icon" />
      </button>
    </div>
  )

  render() {
    const {showMenu} = this.state

    const {match} = this.props
    const {path} = match
    switch (path) {
      case '/popular':
        homeItemStyle = 'not-active-item'
        popularItemStyle = 'active-item'
        accountItemStyle = 'not-active-item'
        break
      case '/account':
        homeItemStyle = 'not-active-item'
        popularItemStyle = 'not-active-item'
        accountItemStyle = 'active-item'
        break
      default:
        homeItemStyle = 'active-item'
        popularItemStyle = 'not-active-item'
        accountItemStyle = 'not-active-item'
    }
    return (
      <nav className="movie-page-nav-container">
        <div className="movie-page-header-content-container">
          <div className="movie-page-header-content-screen">
            <div className="movie-page-logo-items-container">
              <img
                className="movie-page-header-screen-logo"
                alt="website logo"
                src="https://res.cloudinary.com/dxgpp8aab/image/upload/v1661789897/Group_7399movie-page-header-website-logo_g0ovfv.png"
              />
              <ul className="movie-page-nav-items-screen-container">
                <Link className="nav-link" to="/">
                  <li
                    className={`movie-page-nav-items-screen ${homeItemStyle}`}
                  >
                    Home
                  </li>
                </Link>
                <Link className="nav-link" to="/popular">
                  <li
                    className={`movie-page-nav-items-screen ${popularItemStyle}`}
                  >
                    Popular
                  </li>
                </Link>
              </ul>
            </div>
            <div className="movie-page-logo-items-container">
              <button
                testid="searchButton"
                className="movies-page-nav-search-icon-button"
                type="button"
              >
                <HiOutlineSearch className="movies-page-nav-search-icon" />
              </button>
              <Link className="nav-link" to="/account">
                <img
                  className="movie-page-nav-avthar"
                  alt="profile"
                  src="https://res.cloudinary.com/dxgpp8aab/image/upload/v1661837431/Avatarmovies-page-nav-avthar_j5z9ho.png"
                />
              </Link>
              <MdMenuOpen
                onClick={this.onclickMenuOpen}
                className="menu-open-icon"
              />
            </div>
          </div>
          {showMenu && this.renderMenuItemsCard()}
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
