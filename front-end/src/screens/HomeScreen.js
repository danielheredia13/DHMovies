import React, { useState, useEffect } from "react";
import "../style/homeScreen.css";
import { useDispatch, useSelector } from "react-redux";
import HomeMovieCard from "../components/HomeMovieCard";
import HeroImage from "../components/HeroImage";
import { favoriteUserMovies } from "../features/movieUserFavoritesSlice";
import { getpopularMovies } from "../features/moviePopularSlice";
import { getMovieSearch } from "../features/movieSearchSlice";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const favoriteMovies = useSelector((state) => state.movieUserFavorite.movies);
  const {
    movies: popular,
    loading,
    error,
  } = useSelector((state) => state.moviePopular);
  const {
    movies: movieResults,
    loading: loadingSearch,
    error: errorSearch,
  } = useSelector((state) => state.movieSearch);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const movieFavoriteAdded = useSelector(
    (state) => state.movieFavoriteAdd.movie
  );
  const movieFavoriteDeleted = useSelector(
    (state) => state.movieFavoriteDelete.movie
  );

  const queryHandler = (e) => {
    let q = e.target.value;
    setQuery(q);
  };

  const enterKey = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  useEffect(() => {
    if (popular && popular.length === 0) {
      dispatch(getpopularMovies());
    }

    if (
      (userInfo && userInfo.name) ||
      movieFavoriteAdded ||
      movieFavoriteDeleted
    ) {
      dispatch(favoriteUserMovies());
    }
  }, [popular, dispatch, userInfo, movieFavoriteAdded, movieFavoriteDeleted]);

  const searchHandler = async () => {
    dispatch(getMovieSearch(query));

    setQuery("");
  };

  return (
    <main>
      <h1 className="home-title">Daniel Heredia`s Movies</h1>
      <HeroImage popular={popular} />
      <SearchBar
        queryHandler={queryHandler}
        searchHandler={searchHandler}
        query={query}
        enterKey={enterKey}
      />
      {loading && <Loader />}
      {loadingSearch && <Loader />}
      {error && <Message type="error" message={error} />}
      {errorSearch && <Message type="error" message={errorSearch} />}
      <section className="movies-box">
        {movieResults && movieResults.length !== 0
          ? movieResults &&
            movieResults.map(
              (m) =>
                m.poster_path && (
                  <HomeMovieCard
                    key={m.id}
                    m={m}
                    favoriteMovies={favoriteMovies}
                  />
                )
            )
          : popular &&
            popular.map((m) => (
              <HomeMovieCard key={m.id} m={m} favoriteMovies={favoriteMovies} />
            ))}
      </section>
    </main>
  );
};

export default HomeScreen;
