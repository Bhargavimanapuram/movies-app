import './index.css'

const SimilarMovieCard = props => {
  const {movieDetails} = props
  const {posterPath, title} = movieDetails
  return (
    <li className="movie-card-item">
      <img className="similar-movie-image" src={posterPath} alt={title} />
      <p className="movie-title">{title}</p>
    </li>
  )
}
export default SimilarMovieCard
