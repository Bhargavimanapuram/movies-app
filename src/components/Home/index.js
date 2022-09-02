import HomePagePoster from '../HomePagePoster'
import HomeSlickPage from '../HomeSlickPage'
import Footer from '../Footer'
import './index.css'

const Home = () => (
  <div className="movies-app-home-bg">
    <div className="movies-app-content-container">
      <HomePagePoster />
    </div>
    <div className="movies-app-home-slick-container">
      <h1 className="slick-heading">Trending Now</h1>
      <HomeSlickPage pageUrl="https://apis.ccbp.in/movies-app/trending-movies" />
    </div>
    <div className="movies-app-home-slick-container">
      <h1 className="slick-heading">Originals</h1>
      <HomeSlickPage pageUrl="https://apis.ccbp.in/movies-app/originals" />
    </div>
    <Footer />
  </div>
)

export default Home
