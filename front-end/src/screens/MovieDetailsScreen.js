import React, { useEffect, useState } from "react";
import "../style/movieDetailsScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../features/movieDetailsSlice";
import CastCard from "../components/CastCard";
import SimilarMovieCard from "../components/SimilarMovieCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { favoriteUserMovies } from "../features/movieUserFavoritesSlice";
import { favoriteMovieAdd } from "../features/movieFavoriteAddSlice";
import { favoriteMovieDelete } from "../features/movieFavoriteDeleteSlice";
import { getMovieCastCrew } from "../features/movieCastCrewSlice";
import { getMovieSimilar } from "../features/movieSimilarSlice";

const MovieDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { movie, loading, error } = useSelector((state) => state.movieDetails);
  const favoriteMovies = useSelector((state) => state.movieUserFavorite.movies);
  const movieFavoriteAdded = useSelector(
    (state) => state.movieFavoriteAdd.movie
  );
  const movieFavoriteDeleted = useSelector(
    (state) => state.movieFavoriteDelete.movie
  );
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const data = useSelector((state) => state.movieCastCrew.data);
  const similarMovies = useSelector((state) => state.movieSimilar.movies);

  const favorite = favoriteMovies.filter((f) => f.imdb_id === movie.id);

  const imageUrl = "https://image.tmdb.org/t/p/w300/";

  const [castBoolean, setCastBoolean] = useState(false);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);

  useEffect(() => {
    if (
      (movie && typeof movie.title === "undefined") ||
      movie.id !== Number(id)
    ) {
      dispatch(getMovieDetails(id));
      dispatch(getMovieSimilar(id));
      dispatch(getMovieCastCrew(id));
    }
    if (data && data.crew) {
      setCast(data.cast);
      setDirector(data.crew.filter((c) => c.job === "Director"));
    }

    if (
      (userInfo && userInfo.name) ||
      movieFavoriteAdded ||
      movieFavoriteDeleted
    ) {
      dispatch(favoriteUserMovies());
    }
  }, [movie, id, userInfo, movieFavoriteAdded, movieFavoriteDeleted, data]);

  const addFavoriteHandler = () => {
    dispatch(
      favoriteMovieAdd({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      })
    );
  };

  const deleteFavoriteHandler = () => {
    dispatch(
      favoriteMovieDelete({
        id: movie.id,
      })
    );
  };

  return (
    <section className="section-movie-details">
      {loading && <Loader />}
      {error && <Message type="error" message={error} />}
      <h2>
        {movie && movie.title}
        <span>
          {" "}
          ( {movie && movie.release_date && movie.release_date.slice(0, 4)} )
        </span>
      </h2>
      <div className="movie-details-box">
        <img src={`${imageUrl}${movie.poster_path}`} />
        <div
          className="movie-info-box"
          style={{
            background: `linear-gradient(
                rgba(33, 33, 33, 0.8), rgba(33, 33, 33, 0.8)),
                url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}) center`,
          }}
        >
          <h5>Overview:</h5>
          <p>{movie.overview}</p>
          <h5>Genres:</h5>
          <p>
            {movie &&
              movie.genres &&
              movie.genres.map((m) => <span key={m.name}>{m.name}, </span>)}
          </p>
          <h5>Language:</h5>
          <p>{movie.original_language}</p>
          <h5>Runtime:</h5>
          <p>{movie && movie.runtime && (movie.runtime / 60).toFixed(1)} hrs</p>
          <h5>Rating:</h5>
          <p>
            {movie && movie.vote_average && movie.vote_average.toFixed(1)} / 10
          </p>
          <h5>Director:</h5>
          <p>{director && director[0] && director[0].name}</p>
        </div>
        {favorite && favorite.length !== 0 ? (
          <button
            onClick={deleteFavoriteHandler}
            className="movie-details-yellow-star"
          >
            Favorite ⭐
          </button>
        ) : (
          <button
            onClick={addFavoriteHandler}
            className="movie-details-white-star"
          >
            Favorite ⭐
          </button>
        )}
      </div>

      <button
        onClick={() => setCastBoolean(!castBoolean)}
        type="button"
        className="cast-btn"
      >
        Cast
      </button>
      {castBoolean && (
        <div>
          <h2 className="cast-title">Cast</h2>
          <div className="cast-box">
            {cast &&
              cast.map(
                (a) => a.profile_path && <CastCard key={a.name} a={a} />
              )}
          </div>
        </div>
      )}
      <h2>Similar Movies</h2>
      <div className="similar-box">
        {similarMovies &&
          similarMovies.map(
            (m) => m.poster_path && <SimilarMovieCard key={m.id} m={m} />
          )}
      </div>
    </section>
  );
};

export default MovieDetailsScreen;
