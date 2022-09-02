import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class HomePagePoster extends Component {
  state = {
    activeStatus: apiStatus.initial,
    homePosterDetails: {},
  }

  componentDidMount() {
    this.getHomePagePosterDetails()
  }

  getHomePagePosterDetails = async () => {
    this.setState({activeStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const index = Math.ceil(Math.random() * data.total - 1)
      const randomPoster = data.results[index]
      const updatedPoster = {
        backgroundImageUrl: randomPoster.backdrop_path,
        id: randomPoster.id,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
        title: randomPoster.title,
      }
      this.setState({
        activeStatus: apiStatus.success,
        homePosterDetails: updatedPoster,
      })
    } else {
      this.setState({
        activeStatus: apiStatus.failure,
      })
    }
  }

  renderHomePosterSuccessView = () => {
    const {homePosterDetails} = this.state
    const {backgroundImageUrl, overview, title} = homePosterDetails
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: '100% 100%',
          height: '100%',
        }}
      >
        <Header />
        <div className="movies-page-home-poster-content-container">
          <h1 className="movie-page-home-poster-heading">{title}</h1>
          <p className="movie-page-home-poster-des">{overview}</p>
          <button className="movies-app-home-poster-play-button" type="button">
            Play Now
          </button>
        </div>
      </div>
    )
  }

  renderHomePosterLoadingView = () => (
    <>
      <Header />
      <div className="movies-page-home-poster-content-container">
        <div className="poster-loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  onClickTryAgainButton = () => {
    this.getHomePagePosterDetails()
  }

  renderHomePosterFailureView = () => (
    <>
      <Header />
      <div className="movies-page-home-poster-content-container">
        <div className="poster-failure-container">
          <img
            alt="failure view"
            src="https://res.cloudinary.com/dxgpp8aab/image/upload/v1661951075/alert-trianglehome-poster-failure-img_t8tylb.png"
          />
          <p className="home-page-failure-text">
            Something went wrong. Please try again
          </p>
          <button
            onClick={this.onClickTryAgainButton}
            className="movies-app-home-poster-try-again-button"
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  renderHomePosterFinalView = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatus.success:
        return this.renderHomePosterSuccessView()
      case apiStatus.inProgress:
        return this.renderHomePosterLoadingView()
      case apiStatus.failure:
        return this.renderHomePosterFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderHomePosterFinalView()}</>
  }
}
export default HomePagePoster
