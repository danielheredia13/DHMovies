import asyncHandler from "express-async-handler";
import FavoriteMovie from "../models/favoriteMovieModel.js";

// Desc    Add favorite movie
// Route   POST /api/movies/favorite/add
// Access  Private

const favoriteMovieAdd = asyncHandler(async (req, res) => {
  const user = req.user;

  const { id, title, poster_path } = req.body;

  const movieExist = await FavoriteMovie.find({ imdb_id: id });

  if (!movieExist || movieExist.length === 0) {
    const favorite = await FavoriteMovie.create({
      user: user._id,
      imdb_id: id,
      title: title,
      poster_path: poster_path,
    });

    res.status(201).json(favorite);
  } else {
    res.status(404);
    throw new Error("Movie Already Added to Favorites");
  }
});

// Desc    Delete favorite movie by id
// Route   POST /api/movies/favorite/delete
// Access  Private

const favoriteMovieDelete = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const movieExist = await FavoriteMovie.find({ imdb_id: id });

  if (movieExist) {
    const favoriteDeleted = await FavoriteMovie.findOneAndDelete({
      imdb_id: id,
    });

    res.status(201).json(favoriteDeleted);
  } else {
    res.status(404);
    throw new Error("Movie Not Found In Favorites");
  }
});

// Desc    Get login user favorite movies
// Route   GET /api/movies/favorite
// Access  Private

const favoriteMoviesUser = asyncHandler(async (req, res) => {
  const user = req.user;

  const movies = await FavoriteMovie.find({ user: user._id });

  if (movies) {
    res.json(movies);
  } else {
    res.status(404);
    throw new Error("No Favorite Movies");
  }
});

export { favoriteMoviesUser, favoriteMovieAdd, favoriteMovieDelete };
