const express = require("express");
//create a express router
const router = express.Router();

// import the Movie model
const Tvshows = require("../models/tvshow");

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

  let filter = {};
  if (title) {
    filter.title = title;
  }

  if (creator) {
    filter.creator = creator;
  }

  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }

  if (end_year) {
    filter.end_year = end_year;
  }

  if (seasons) {
    filter.seasons = seasons;
  }

  if (genre) {
    filter.genre = genre;
  }

  if (rating) {
    filter.rating = { $gt: rating };
  }

  // load the movies data from Mongodb
  const tvshows = await Tvshows.find(filter).sort({ _id: -1 });
  res.send(tvshows);
});

// GET /movies/:id - get a specific movie
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const tvshows = await Tvshows.findById(id);
  res.send(tvshows);
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

    // create new movie
    const newTvshow = new Tvshows({
      title: title,
      creator: creator,
      premiere_year: premiere_year,
      end_year: end_year,
      seasons: seasons,
      genre: genre,
      rating: rating,
    });
    // save the new movie into mongodb
    await newTvshow.save(); // clicking the "save" button

    res.status(200).send(newTvshow);
  } catch (error) {
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

    const updatedTvshow = await Tvshows.findByIdAndUpdate(
      id,
      {
        title: title,
        creator: creator,
        premiere_year: premiere_year,
        end_year: end_year,
        seasons: seasons,
        genre: genre,
        rating: rating,
      },
      {
        new: true, // return the updated data
      }
    );

    res.status(200).send(updatedTvshow);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

//  DELETE /movies/68943cf564aa9f8354cef260 - delete movie
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // delete the movie
    await Tvshows.findByIdAndDelete(id);

    res.status(200).send({
      message: `Movie with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
