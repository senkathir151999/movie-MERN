import React from "react";
import "./style.css";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { usePalette } from "react-palette";
import { truncateString } from "../../utils/commonFunctio";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  // const { data, loading, error } = usePalette("https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg");
  const navigateTo = (id) => {
    navigate(`/movie/${id}`);
  };
  return (
    <div className="card-container" onClick={() => navigateTo(movie?.movie_id)}>
      <div className="card-content">
        <div className="card-image-container">
          <img src={movie?.poster_url} alt="moveie" />
        </div>
        <div className="card-labeling-content">
          <h5>{truncateString(movie?.title, 10)}</h5>
          <p>
            Director:{" "}
            {`${movie?.director_first_name} ${movie?.director_last_name}`}{" "}
          </p>
          <p>Time: {movie?.runtime} mins </p>
          <div className="movie-rating-container">
            <div className="movie-rating">{movie?.imdb_rating}</div>
            <div className="movie-rating-star">
              {[1, 2, 3, 4, 5].map((item) =>
                item <= movie?.rating ? (
                  <AiFillStar color={"#ff944d"} key={item} />
                ) : (
                  <CiStar key={item} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
