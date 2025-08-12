// import the Movie model
const Tvshows = require("../models/tvshow");

async function getShows(title, creator, premiere_year, end_year, seasons, genre, rating) {
  // create a empty container for filter
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
  // return the movies
  return tvshows;
}

async function getShow(id) {
  // load the movie data based on id
  const tvshow = await Tvshows.findById(id);
  return tvshow;
}

async function addShow(title, creator, premiere_year, end_year, seasons, genre, rating) {
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
    return newTvshow;
}

async function updateShow(id, title, creator, premiere_year, end_year, seasons, genre, rating) {
  return await Tvshows.findByIdAndUpdate(
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
}

async function deleteShow(id) {
        return await Tvshows.findByIdAndDelete(id);
}

module.exports = {
  getShows,
  getShow,
  addShow,
  updateShow,
  deleteShow,
};
