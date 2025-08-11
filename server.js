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








app.get("/", (req, res) => {
  res.send("AHHHHHHHHHHHHHH");
});


const movieRouter = require("./routes/movie");
app.use("/movies", movieRouter)

const tvshowRouter = require("./routes/tvshow");
app.use("/tvshow", tvshowRouter)







app.listen(7777, () => {
  console.log("AHHHHHHHHHHHHHHHHHH http://localhost:7777");
});
