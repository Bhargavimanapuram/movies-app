import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, posterPath, title} = movieDetails
  return (
    <Link to={`movies/${id}`}>
      <li>
        <img className="movie-image" src={posterPath} alt={title} />
      </li>
    </Link>
  )
}
export default MovieCard
