const db = require("../db");


async function getAllMovies(movieId) {
  const connection = await db.getConnection();
  try {
    let sql = `
    SELECT
      M.movie_id,
      M.title,
      M.runtime,
      M.plot_summary,
      M.poster_url,
      M.trailer_url,
      M.imdb_rating,
      M.rating,
      M.movie_price,
      D.first_name AS director_first_name,
      D.last_name AS director_last_name,
      GROUP_CONCAT(A.image) AS actor_images
    FROM Movies M
    LEFT JOIN Directors D ON M.director_id = D.director_id
    LEFT JOIN MovieActors MA ON M.movie_id = MA.movie_id
    LEFT JOIN Actors A ON MA.actor_id = A.actor_id
    
  `;
    if (movieId !== null && movieId !== undefined) {
      sql += ` WHERE M.movie_id = ${movieId}`;
    } else {
      sql += ` GROUP BY M.movie_id`;
    }
    const [results] = await connection.query(sql);

    connection.release();
    const moviesWithActors = results.map((movie) => {
      return {
        ...movie,
        actor_images: movie.actor_images ? movie.actor_images.split(",") : [],
      };
    });

    if (moviesWithActors) return moviesWithActors;

    return null;
  } catch (error) {
   
    return "error";
  }
}


module.exports.getAllMovies = getAllMovies;

