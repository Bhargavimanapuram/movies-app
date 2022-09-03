import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import format from 'date-fns/format'
import Header from '../Header'
import SimilarMovieCard from '../SimilarMovieCard'
import Footer from '../Footer'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {
    movieDetails: {},
    similarMoviesList: [],
    activeStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    this.setState({activeStatus: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const requiredMovieDetails = data.movie_details
      const updatedMovieDetails = {
        adult: requiredMovieDetails.adult,
        backgroundImage: requiredMovieDetails.backdrop_path,
        budget: requiredMovieDetails.budget,
        genres: requiredMovieDetails.genres,
        id: requiredMovieDetails.id,
        overview: requiredMovieDetails.overview,
        posterPath: requiredMovieDetails.poster_path,
        releaseDate: requiredMovieDetails.release_date,
        runtime: requiredMovieDetails.runtime,
        title: requiredMovieDetails.title,
        voteAverage: requiredMovieDetails.vote_average,
        voteCount: requiredMovieDetails.vote_count,
        spokenLanguages: requiredMovieDetails.spoken_languages.map(each => ({
          id: each.id,
          englishName: each.english_name,
        })),
      }
      const similarMoviesList = requiredMovieDetails.similar_movies.map(
        each => ({
          backgroundImage: each.backdrop_path,
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      this.setState({
        similarMoviesList,
        movieDetails: updatedMovieDetails,
        activeStatus: apiStatus.success,
      })
    } else {
      this.setState({
        activeStatus: apiStatus.failure,
      })
    }
  }

  renderMovieDetailsView = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatus.inProgress:
        return this.renderMovieDetailsInprogressView()
      case apiStatus.success:
        return this.renderMovieDetailsSuccessView()
      case apiStatus.failure:
        return this.renderMovieDetailsFailureView()
      default:
        return null
    }
  }

  renderMovieDetailsInprogressView = () => (
    <>
      <Header />
      <div className="movie-details-content-container">
        <div className="movie-details-loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  onClickTryAgainButton = () => {
    this.getMovieItemDetails()
  }

  renderMovieDetailsFailureView = () => (
    <>
      <Header />
      <div className="movie-details-content-container">
        <div className="movie-details-failure-container">
          <img
            alt="failure view"
            src="https://res.cloudinary.com/dxgpp8aab/image/upload/v1661951075/alert-trianglehome-poster-failure-img_t8tylb.png"
          />
          <p className="movie-details-failure-text">
            Something went wrong. Please try again
          </p>
          <button
            onClick={this.onClickTryAgainButton}
            className="movie-details-try-again-button"
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  renderMovieDetailsSuccessView = () => {
    const {similarMoviesList, movieDetails} = this.state
    const {
      adult,
      backgroundImage,
      budget,
      genres,
      overview,
      releaseDate,
      runtime,
      title,
      voteAverage,
      voteCount,
      spokenLanguages,
    } = movieDetails
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const year = format(new Date(releaseDate), 'yyyy')
    const month = format(new Date(releaseDate), 'MMMM')
    const day = format(new Date(releaseDate), 'do')
    const filmCertification = adult ? 'A' : 'U/A'
    return (
      <div>
        <div
          className="poster-container"
          style={{
            '--img': `url(${backgroundImage})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header />
          <div className="movie-details-content-container">
            <h1 className="movie-details-heading">{title}</h1>
            <div className="movie-details-time-details-container">
              <p className="movie-details-time-des">
                {hours}h {minutes}m
              </p>
              <p className="movie-details-time-des filmCertification">
                {filmCertification}
              </p>
              <p className="movie-details-time-des">{year}</p>
            </div>
            <p className="movie-details-des">{overview}</p>
            <button className="movie-details-play-button" type="button">
              Play Now
            </button>
          </div>
        </div>
        <div className="movie-details-content-container">
          <div className="movie-details-specifications-container">
            <div className="movie-details-specification-container">
              <h1 className="movie-details-specifications-heading">Genres</h1>
              <ul className="specifications-list">
                {genres.map(eachGenre => (
                  <p
                    key={eachGenre.id}
                    className="movie-details-specifications-item"
                  >
                    {eachGenre.name}
                  </p>
                ))}
              </ul>
            </div>
            <div className="movie-details-specification-container">
              <h1 className="movie-details-specifications-heading">
                Audio Available
              </h1>
              <ul className="specifications-list">
                {spokenLanguages.map(eachLanguage => (
                  <p
                    key={eachLanguage.id}
                    className="movie-details-specifications-item"
                  >
                    {eachLanguage.englishName}
                  </p>
                ))}
              </ul>
            </div>
            <div className="movie-details-specification-container">
              <h1 className="movie-details-specifications-heading">
                Rating Count
              </h1>
              <p className="movie-details-specifications-item">{voteCount}</p>
              <h1 className="movie-details-specifications-heading">
                Rating Average
              </h1>
              <p className="movie-details-specifications-item">{voteAverage}</p>
            </div>
            <div className="movie-details-specification-container">
              <h1 className="movie-details-specifications-heading">Budget</h1>
              <p className="movie-details-specifications-item">{budget}</p>
              <h1 className="movie-details-specifications-heading">
                Release Date
              </h1>
              <p className="movie-details-specifications-item">
                {day} {month} {year}
              </p>
            </div>
          </div>
          <h1 className="movie-details-more-like-this-heading">
            More Like This
          </h1>
          <ul className="similar-movies-list-container">
            {similarMoviesList.map(eachMovie => (
              <SimilarMovieCard key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    return (
      <div className="movie-details-bg">{this.renderMovieDetailsView()}</div>
    )
  }
}
export default MovieItemDetails
