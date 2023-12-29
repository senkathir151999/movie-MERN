const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async-middleware");
const movieController = require("../controllers/movie_controller");

router.post("/add", [
  // jwtController.isValid,
  asyncMiddleware(movieController.addMovie),
]);

router.get("/movies/:id", [asyncMiddleware(movieController.getSingle)]);
router.get("/movies", [asyncMiddleware(movieController.getAllMovie)]);
router.post("/director", [asyncMiddleware(movieController.addAndEditDirector)]);
router.post("/actor", [asyncMiddleware(movieController.addAndEditActor)]);
router.post("/movieActor", [asyncMiddleware(movieController.updateActorMovie)]);

module.exports = router;
