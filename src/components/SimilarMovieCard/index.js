import './index.css'

const SimilarMovieCard = props => {
  const {movieDetails} = props
  const {posterPath, title} = movieDetails
  return (
    <li>
      <img className="similar-movie-image" src={posterPath} alt={title} />
    </li>
  )
}
export default SimilarMovieCard
