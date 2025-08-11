const {Schema, model} = require("mongoose");


const TvshowsSchema = new Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  end_year: Number,
  seasons: Number,
  genre: String,
  rating: Number,
});

const Tvshows = model("Tvshows", TvshowsSchema);

module.exports = Tvshows;
