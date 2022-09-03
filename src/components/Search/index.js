import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import MovieCard from '../MovieCard'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    showMenu: false,
    searchInput: '',
    searchMoviesList: [],
    activeStatus: apiStatus.initial,
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

  onBlurSearchInput = event => {
    const searchInput = event.target.value
    this.setState({searchInput})
  }

  onClickSearchIcon = () => {
    this.getSearchMovieDetails()
  }

  getSearchMovieDetails = async () => {
    this.setState({activeStatus: apiStatus.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const searchMoviesList = data.results.map(each => ({
        backgroundImage: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        searchMoviesList,
        activeStatus: apiStatus.success,
      })
    } else {
      this.setState({
        activeStatus: apiStatus.failure,
      })
    }
  }

  renderSearchMoviesInprogressView = () => (
    <div className="search-movies-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickTryAgainButton = () => {
    this.getSearchMovieDetails()
  }

  renderSearchMoviesFailureView = () => (
    <div className="search-movies-failure-container">
      <img
        className="search-failure-image"
        alt="failure view"
        src="https://res.cloudinary.com/dxgpp8aab/image/upload/v1662119577/Background-Completesomething_wrong-image_stey2t.png"
      />
      <p className="search-movies-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        onClick={this.onClickTryAgainButton}
        className="search-movies-try-again-button"
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderMenuItemsCard = () => (
    <div className="movie-page-nav-menu-mobile-container">
      <ul className="movie-page-nav-items-mobile-container">
        <Link className="nav-link" to="/">
          <li className="movie-page-nav-items-screen">Home</li>
        </Link>
        <Link className="nav-link" to="/popular">
          <li className="movie-page-nav-items-screen">Popular</li>
        </Link>
        <Link className="nav-link" to="/account">
          <li className="movie-page-nav-items-screen">Account</li>
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

  renderSearchInput = () => (
    <div className="search-input-container">
      <input
        onBlur={this.onBlurSearchInput}
        placeholder="Search"
        className="input-container"
        type="search"
      />
      <button
        onClick={this.onClickSearchIcon}
        className="search-button"
        type="button"
        testid="searchButton"
      >
        <HiOutlineSearch className="search-icon" />
      </button>
    </div>
  )

  renderHeader = () => {
    const {showMenu} = this.state
    return (
      <nav className="movie-page-nav-container">
        <div className="movie-page-header-content-container">
          <div className="movie-page-header-content-screen">
            <div className="movie-page-logo-items-container">
              <Link className="nav-link" to="/">
                <img
                  className="movie-page-header-screen-logo"
                  alt="website logo"
                  src="https://res.cloudinary.com/dxgpp8aab/image/upload/v1661789897/Group_7399movie-page-header-website-logo_g0ovfv.png"
                />
              </Link>
              <ul className="movie-page-nav-items-screen-container">
                <Link className="nav-link" to="/">
                  <li className="movie-page-nav-items-screen">Home</li>
                </Link>
                <Link className="nav-link" to="/popular">
                  <li className="movie-page-nav-items-screen">Popular</li>
                </Link>
              </ul>
            </div>
            <div className="movie-page-logo-items-container">
              {this.renderSearchInput()}
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

  renderListOfSearchResults = () => {
    const {searchMoviesList} = this.state
    return (
      <ul className="popular-movies-list-container">
        {searchMoviesList.map(eachMovie => (
          <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
        ))}
      </ul>
    )
  }

  renderNoResultsView = () => {
    const {searchInput} = this.state
    return (
      <div className="search-movies-failure-container">
        <img
          className="search-failure-image"
          alt="no movies"
          src="https://res.cloudinary.com/dxgpp8aab/image/upload/v1662176791/Group_7394no-movies-result_nrwjwl.png"
        />
        <p className="search-no-movies-text">{`Your search for ${searchInput} did not find any matches.`}</p>
      </div>
    )
  }

  renderSearchMoviesSuccessView = () => {
    const {searchMoviesList} = this.state
    const lengthOfList = searchMoviesList.length
    return (
      <>
        {lengthOfList !== 0
          ? this.renderListOfSearchResults()
          : this.renderNoResultsView()}
      </>
    )
  }

  renderSearchMoviesView = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatus.inProgress:
        return this.renderSearchMoviesInprogressView()
      case apiStatus.success:
        return this.renderSearchMoviesSuccessView()
      case apiStatus.failure:
        return this.renderSearchMoviesFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-page-bg">
        {this.renderHeader()}
        <div className="search-movies-content-container">
          {this.renderSearchMoviesView()}
        </div>
      </div>
    )
  }
}

export default Search
