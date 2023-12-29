import React, { useState, useEffect } from "react";
import MovieCard from "../components/cards/MovieCard";
import { getData } from "../api";
import {movieList} from "../api/movieListData ";

function MovieList() {
  const [moviesData, setMoviesData] = useState(movieList || []);
  const [loading, setLoading] = useState(false);

  const getAllData = async () => {
    setLoading(true);
    const response = await getData("/movie/movies", {});
    if (response.status === "success") {
      setMoviesData(response?.data);
      console.log(response?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        moviesData.map((item) => {
          return <MovieCard movie={item} key={item.movie_id} />;
        })
      )}
    </>
  );
}

export default MovieList;
