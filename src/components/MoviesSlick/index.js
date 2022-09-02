import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 830,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 620,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const MoviesSlick = props => {
  const {moviesList} = props

  const renderMoviesSlider = () => (
    <Slider {...settings}>
      {moviesList.map(eachMovie => {
        const {id, title, posterPath} = eachMovie
        return (
          <Link to={`/movies/${id}`}>
            <div className="slick-item" key={id}>
              <img className="movie-image" src={posterPath} alt={title} />
            </div>
          </Link>
        )
      })}
    </Slider>
  )

  return <div>{renderMoviesSlider()}</div>
}

export default MoviesSlick
