const express = require("express");
const mongoose = require("mongoose");
const app = express();

//the clair ring
async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("AAAAAAAAAAAAAAAAA MONGO CONNECTED AAAAAAAAAA");
  } catch (error) {
    console.log(error);
  }
}

//tree gar
connectToMongoDB();

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
});

const TvshowsSchema = new mongoose.Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  end_year: Number,
  seasons: Number,
  genre: String,
  rating: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

const Tvshows = mongoose.model("Tvshows", TvshowsSchema);

app.get("/", (req, res) => {
  res.send("AHHHHHHHHHHHHHH");
});

app.get("/movies", async (req, res) => {
  const director = req.query.director;
  const genre = req.query.genre;
  const rating = req.query.rating;

  let filter = {};
  if (director) {
    filter.director = director;
  }

  if (genre) {
    filter.genre = genre;
  }

  if (rating) {
    filter.rating = { $gt: rating };
  }

  const movies = await Movie.find(filter);
  res.send(movies);
});

app.get("/tvshows", async (req, res) => {
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

app.get("/movies:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  res.setDefaultEncoding(movie);
});

app.get("/tvshows:id", async (req, res) => {
  const id = req.params.id;
  const shows = await Tvshows.findById(id);
  res.setDefaultEncoding(shows);
});

app.listen(7777, () => {
  console.log("AHHHHHHHHHHHHHHHHHH http://localhost:7777");
});
