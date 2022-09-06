import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, posterPath, title} = movieDetails
  return (
    <Link className="link" to={`movies/${id}`}>
      <li className="movie-card-item">
        <img className="movie-image" src={posterPath} alt={title} />
        <p className="movie-title">{title}</p>
      </li>
    </Link>
  )
}
export default MovieCard
