const moviesModel = require("../model/movies_model");

const db = require("../db");

async function getAllMovie(req, res) {
  const result = await moviesModel.getAllMovies();
  return result === "error"
    ? res
        .status(400)
        .json({ status: "error", message: "Error in fetching data" })
    : res
        .status(200)
        .json({ status: "success", message: "All data fetched", data: result });
}
async function getSingle(req, res) {
  let movieId = req.params.id;
  let result = await moviesModel.getAllMovies(movieId);
  return result === "error"
    ? res
        .status(400)
        .json({ status: "error", message: "Error in fetching data" })
    : res
        .status(200)
        .json({ status: "success", message: "All data ", data: result[0] });
}
async function addAndEditMovie(req, res) {
  const {
    id, // The movie ID (optional for creating, required for editing)
    title,
    runtime,
    plot_summary,
    poster_url,
    trailer_url,
    imdb_rating,
    rating,
    movie_price,
    director_id,
  } = req.body;
  if (
    !title ||
    !runtime ||
    !plot_summary ||
    !poster_url ||
    !trailer_url ||
    !imdb_rating ||
    !rating ||
    !movie_price ||
    !director_id
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  if (id) {
    const updateSql = `
      UPDATE Movies
      SET
        title = ?,
        runtime = ?,
        plot_summary = ?,
        poster_url = ?,
        trailer_url = ?,
        imdb_rating = ?,
        rating = ?,
        movie_price = ?,
        director_id = ?
      WHERE
        movie_id = ?
    `;

    const updateValues = [
      title,
      runtime,
      plot_summary,
      poster_url,
      trailer_url,
      imdb_rating,
      rating,
      movie_price,
      director_id,
      id,
    ];

    db.query(updateSql, updateValues, (err, results) => {
      if (err) {
        console.error("Error updating the movie:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Movie not found" });
      }

      res.json({ message: "Movie updated successfully", movie: req.body });
    });
  } else {
    const createSql = `
      INSERT INTO Movies
        (title, runtime, plot_summary, poster_url, trailer_url, imdb_rating, rating, movie_price, director_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const createValues = [
      title,
      runtime,
      plot_summary,
      poster_url,
      trailer_url,
      imdb_rating,
      rating,
      movie_price,
      director_id,
    ];

    db.query(createSql, createValues, (err, results) => {
      if (err) {
        console.error("Error creating a movie:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Return the newly created movie data
      res.status(201).json({
        message: "Movie created successfully",
        movie: { id: results.insertId, ...req.body },
      });
    });
  }
}
async function addAndEditDirector(req, res) {
  const {
    id, // The director ID (optional for adding, required for updating)
    first_name,
    last_name,
    birthdate,
    biography,
  } = req.body;

  ta;
  if (!first_name || !last_name || !birthdate || !biography) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  if (id) {
    const updateSql = `
      UPDATE Directors
      SET
        first_name = ?,
        last_name = ?,
        birthdate = ?,
        biography = ?
      WHERE
        director_id = ?
    `;

    const updateValues = [first_name, last_name, birthdate, biography, id];

    db.query(updateSql, updateValues, (err, results) => {
      if (err) {
        console.error("Error updating the director:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Director not found" });
      }

      res.json({
        message: "Director updated successfully",
        director: req.body,
      });
    });
  } else {
    const createSql = `
      INSERT INTO Directors (first_name, last_name, birthdate, biography)
      VALUES (?, ?, ?, ?)
    `;

    const createValues = [first_name, last_name, birthdate, biography];

    db.query(createSql, createValues, (err, results) => {
      if (err) {
        console.error("Error creating a director:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.status(201).json({
        message: "Director created successfully",
        director: { id: results.insertId, ...req.body },
      });
    });
  }
}
async function addAndEditActor(req, res) {
  const {
    id, // The actor ID (optional for adding, required for updating)
    first_name,
    last_name,
    birthdate,
    image,
  } = req.body;

  if (!first_name || !last_name || !birthdate || !image) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  if (id) {
    // If an ID is provided, it's an update request
    // Construct and execute an SQL query to update the actor in the database
    const updateSql = `
      UPDATE Actors
      SET
        first_name = ?,
        last_name = ?,
        birthdate = ?,
        image = ?
      WHERE
        actor_id = ?
    `;

    const updateValues = [first_name, last_name, birthdate, image, id];

    db.query(updateSql, updateValues, (err, results) => {
      if (err) {
        console.error("Error updating the actor:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Actor not found" });
      }

      res.json({ message: "Actor updated successfully", actor: req.body });
    });
  } else {
    const createSql = `
      INSERT INTO Actors (first_name, last_name, birthdate, image)
      VALUES (?, ?, ?, ?)
    `;

    const createValues = [first_name, last_name, birthdate, image];

    db.query(createSql, createValues, (err, results) => {
      if (err) {
        console.error("Error creating an actor:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.status(201).json({
        message: "Actor created successfully",
        actor: { id: results.insertId, ...req.body },
      });
    });
  }
}
async function updateActorMovie(req, res) {
  const { movie_id, actor_id } = req.body;

  if (!movie_id || !actor_id) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const checkSql = `
    SELECT * FROM MovieActors
    WHERE movie_id = ? AND actor_id = ?
  `;

  db.query(checkSql, [movie_id, actor_id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking the movie-actor association:", checkErr);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (checkResults.length > 0) {
      return res.json({
        message: "Movie-actor association already exists",
        association: req.body,
      });
    } else {
      const insertSql = `
        INSERT INTO MovieActors (movie_id, actor_id)
        VALUES (?, ?)
      `;

      db.query(insertSql, [movie_id, actor_id], (insertErr, insertResults) => {
        if (insertErr) {
          console.error("Error adding a movie-actor association:", insertErr);
          return res.status(500).json({ error: "Internal server error" });
        }

        a;
        res.status(201).json({
          message: "Movie-actor association created successfully",
          association: { movie_id, actor_id },
        });
      });
    }
  });
}

module.exports.getSingle = getSingle;
module.exports.getAllMovie = getAllMovie;
module.exports.addAndEditMovie = addAndEditMovie;
module.exports.addAndEditDirector = addAndEditDirector;
module.exports.addAndEditActor = addAndEditActor;
module.exports.updateActorMovie = updateActorMovie;
