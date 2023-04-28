import mongoose from "mongoose";

const favoriteMovieSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  imdb_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
    unique: true,
  },
  favorite: {
    type: Boolean,
    required: true,
    default: true,
  },
  watched: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const FavoriteMovie = mongoose.model("FavoriteMovie", favoriteMovieSchema);

export default FavoriteMovie;
