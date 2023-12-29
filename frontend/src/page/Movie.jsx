import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/cards/VideoPlayer";
import { FaPlay, FaRegObjectUngroup } from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CgPlayPause } from "react-icons/cg";
import "./movies.css";
import { truncateString } from "../utils/commonFunctio";
import MovieRating from "../components/cards/MovieRating";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getData } from "../api";
import {movieList} from "../api/movieListData ";
function Movie() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(movieList[id-1] || {});
  let navigate = useNavigate();

  const getMovieData = async () => {
    setLoading(true);
    const response = await getData(`/movie/movies/${id}`, {});
    if (response.status === "success") {
      setMovie(response?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getMovieData();
    }
  }, []);

  const [showMore, setShowMore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="movie-container-view">
      <div className="back-icon" onClick={() => navigate("/")}>
        <MdOutlineArrowBackIosNew color={"#FFFFFF"} size={20} />
      </div>
      <div className="back-dot">...</div>
      <VideoPlayer setIsPlaying={setIsPlaying} isPlaying={isPlaying} />
      <div className="single-movie-container">
        <div className="movie-info">
          <div className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <CgPlayPause color="white" size={30} />
            ) : (
              <FaPlay color="white" />
            )}
          </div>
          <h3 className="movie-title">{movie?.title}</h3>
          <MovieRating imdb={movie?.imdb_rating} rating={movie?.rating} />
          <p clasName="movie-description">
            {showMore
              ? movie?.plot_summary
              : truncateString(movie?.plot_summary, 150)}
            {
              <span
                className="description-more"
                onClick={() => setShowMore(!showMore)}
              >
                {movie?.plot_summary?.length >= 90 && !showMore
                  ? " more"
                  : "less"}
              </span>
            }
          </p>
        </div>
      </div>
      <div className="actor-movies">
        <div className="actor-movies-title-container">
          <div className="movies-title-label">Actors</div>
          <div className="movies-title-all">See all</div>
        </div>
        <div className="actor-image-container-all">
          {movie?.actor_images?.map((item, index) => {
            return (
              <div className="actor-image-container" key={index}>
                <img src={item} alt="actors" />
              </div>
            );
          })}
        </div>
      </div>
      <footer>
        <div className="footer-item">
          <label className="total-label">Total:</label>
          <span className="total-amount">${movie?.movie_price}</span>
        </div>
        <div className="footer-item">
          <button className="button">Check Out</button>
        </div>
      </footer>
    </div>
  );
}

export default Movie;
