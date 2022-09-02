import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import MoviesSlick from '../MoviesSlick'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeSlickPage extends Component {
  state = {moviesList: [], activeStatus: apiStatus.initial}

  componentDidMount() {
    this.getMoviesDetails()
  }

  getMoviesDetails = async () => {
    this.setState({activeStatus: apiStatus.inProgress})
    const {pageUrl} = this.props
    const jwtToken = Cookies.get('jwt_token')
    // const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(pageUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedMoviesList = data.results.map(eachMovie => ({
        backgroundImageUrl: eachMovie.backdrop_path,
        id: eachMovie.id,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))

      this.setState({
        activeStatus: apiStatus.success,
        moviesList: updatedMoviesList,
      })
    } else {
      this.setState({
        activeStatus: apiStatus.failure,
      })
    }
  }

  renderMoviesSlickView = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatus.inProgress:
        return this.renderMoviesSlickInprogressView()
      case apiStatus.success:
        return this.renderMoviesSlickSuccessView()
      case apiStatus.failure:
        return this.renderMoviesSlickFailureView()
      default:
        return null
    }
  }

  renderMoviesSlickInprogressView = () => (
    <div className="slick-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderMoviesSlickSuccessView = () => {
    const {moviesList} = this.state
    return <MoviesSlick moviesList={moviesList} />
  }

  onClickTryAgainButton = () => {
    this.getMoviesDetails()
  }

  renderMoviesSlickFailureView = () => (
    <div className="slick-failure-container">
      <img
        alt="failure view"
        src="https://res.cloudinary.com/dxgpp8aab/image/upload/v1661951075/alert-trianglehome-poster-failure-img_t8tylb.png"
      />
      <p className="slick-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        onClick={this.onClickTryAgainButton}
        className="movies-app-home-slick-try-again-button"
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  render() {
    return <div className="Slick-container">{this.renderMoviesSlickView()}</div>
  }
}

export default HomeSlickPage
