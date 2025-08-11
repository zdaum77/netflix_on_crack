const express = require("express");
//create a express router
const router = express.Router();

const Tvshows = require("../models/tvshow")

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

  const shows = await Tvshows.find(filter);
  res.send(shows);
});


// GET /movies/:id - get a specific movie
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const tvshows = await Tvshows.findById(id);
  res.send(tvshows);
});

module.exports = router;