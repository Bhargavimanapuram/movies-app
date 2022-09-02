import {Component} from 'react'
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
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
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
      this.setState({
        popularMoviesList,
        activeStatus: apiStatus.success,
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
    const {popularMoviesList} = this.state
    return (
      <>
        <ul className="popular-movies-list-container">
          {popularMoviesList.map(eachMovie => (
            <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </ul>
        <Footer />
      </>
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
