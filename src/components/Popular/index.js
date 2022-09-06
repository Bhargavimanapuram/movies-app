import {Component} from 'react'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieCard from '../MovieCard'
import Footer from '../Footer'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {
    popularMoviesList: [],
    activeStatus: apiStatus.initial,
    currentPage: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  onClickLeft = () => {
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage - 1,
        }),
        this.getPopularMovies,
      )
    }
  }

  onClickRight = () => {
    const {totalPages, currentPage} = this.state
    if (currentPage < totalPages) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage + 1,
        }),
        this.getPopularMovies,
      )
    }
  }

  getPopularMovies = async () => {
    const {currentPage} = this.state
    this.setState({activeStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/popular-movies`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const popularMoviesList = data.results.map(each => ({
        backgroundImage: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      const indexOfLastMovie = currentPage * 8
      const indexOfFirstMovie = indexOfLastMovie - 8
      const updatedPopularMoviesList = popularMoviesList.slice(
        indexOfFirstMovie,
        indexOfLastMovie,
      )
      const totalPages = Math.ceil(popularMoviesList.length / 8)
      this.setState({
        popularMoviesList: updatedPopularMoviesList,
        activeStatus: apiStatus.success,
        totalPages,
      })
    } else {
      this.setState({
        activeStatus: apiStatus.failure,
      })
    }
  }

  renderPopularMoviesInprogressView = () => (
    <div className="popular-movies-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickTryAgainButton = () => {
    this.getPopularMovies()
  }

  renderPopularMoviesFailureView = () => (
    <div className="popular-movies-failure-container">
      <img
        className="popular-failure-image"
        alt="failure view"
        src="https://res.cloudinary.com/dxgpp8aab/image/upload/v1662119577/Background-Completesomething_wrong-image_stey2t.png"
      />
      <p className="popular-movies-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        onClick={this.onClickTryAgainButton}
        className="popular-movies-try-again-button"
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderPopularMoviesSuccessView = () => {
    const {popularMoviesList, currentPage, totalPages} = this.state
    return (
      <div className="content-container">
        <ul className="popular-movies-list-container">
          {popularMoviesList.map(eachMovie => (
            <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </ul>
        <div>
          <div className="pagination-container">
            <button
              className="pagination-button"
              onClick={this.onClickLeft}
              type="button"
            >
              <FaChevronLeft className="pagination-icon" />
            </button>
            <p className="page-numbers-style">
              {currentPage} of {totalPages}
            </p>
            <button
              className="pagination-button"
              onClick={this.onClickRight}
              type="button"
            >
              <FaChevronRight className="pagination-icon" />
            </button>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  renderPopularMoviesView = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatus.inProgress:
        return this.renderPopularMoviesInprogressView()
      case apiStatus.success:
        return this.renderPopularMoviesSuccessView()
      case apiStatus.failure:
        return this.renderPopularMoviesFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-bg-container">
        <Header />
        <div className="popular-movies-content-container">
          {this.renderPopularMoviesView()}
        </div>
      </div>
    )
  }
}

export default Popular
