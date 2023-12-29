import React from "react";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import "./style.css";
function MovieRating({ imdb, rating }) {
  return (
    <div className="movie-rating-container">
      <div className="movie-rating">{imdb}</div>
      <div className="movie-rating-star">
        {[1, 2, 3, 4, 5].map((item) =>
          item <= rating ? (
            <AiFillStar color={"#ff944d"} key={item} />
          ) : (
            <CiStar key={item} />
          )
        )}
      </div>
    </div>
  );
}

export default MovieRating;
