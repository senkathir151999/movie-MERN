import React from "react";
import Tab from "../components/tab/Tab";
import MovieList from "./MovieList";

const Movies = () => {
  const tabs = [
    {
      label: "Now",
      content: (
        <>
          <MovieList />
        </>
      ),
    },
    {
      label: "Recently",
      content: <div>No list</div>,
    },
  ];

  return (
    <div className="movies-container">
      <Tab tabs={tabs} />
    </div>
  );
};

export default Movies;
