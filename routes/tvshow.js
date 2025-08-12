const express = require("express");
//create a express router
const router = express.Router();

// import the Movie model
const {
  getShows,
  getShow,
  addShow,
  updateShow,
  deleteShow,
} = require("../controllers/tvshow");


/* 
  Routes for movies
  GET /movies - list all the movies
  GET /movies/68943cf564aa9f8354cef260 - get a specific movie
  POST /movies - add new movie
  PUT /movies/68943cf564aa9f8354cef260 - update movie
  DELETE /movies/68943cf564aa9f8354cef260 - delete movie
*/
// GET /movies - list all the movies
/*
  query params is everything after the ? mark
*/
router.get("/", async (req, res) => {
  const title = req.query.title;
  const creator = req.query.creator;
  const premiere_year = req.query.premiere_year;
  const end_year = req.query.end_year;
  const seasons = req.query.seasons;
  const genre = req.query.genre;
  const rating = req.query.rating;
  // load the movies data from Mongodb
  const tvshows = await getShows(title, creator, premiere_year, end_year, seasons, genre, rating);
  res.status(200).send(tvshows);
});

// GET /movies/:id - get a specific movie
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const tvshows = await getShow(id);
  res.status(200).send(tvshows);
});

/* 
  POST /movies - add new movie
  This POST route need to accept the following parameters:
  - title
  - director
  - release_year
  - genre
  - rating
*/
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (
      !title ||
      !creator ||
      !premiere_year ||
      !end_year ||
      !seasons ||
      !genre ||
      !rating
    ) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }
     res
     .status(200)
     .send(await addShow(title, creator, premiere_year, end_year, seasons, genre, rating));
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Unknown error" });
  }
});

//  PUT /movies/68943cf564aa9f8354cef260 - update movie
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the movie
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (

      !title ||
      !creator ||
      !premiere_year ||
      !end_year ||
      !seasons ||
      !genre ||
      !rating
    ) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }
    res
    .status(200)
    .send(await updateShow(id, title, creator, premiere_year, end_year, seasons, genre, rating));
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Unknown error" });
  }
});

//  DELETE /movies/68943cf564aa9f8354cef260 - delete movie
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // delete the movie
    await deleteShow(id)

    res.status(200).send({
      message: `Show with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
