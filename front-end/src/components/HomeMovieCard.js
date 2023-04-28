import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { favoriteMovieAdd } from "../features/movieFavoriteAddSlice";
import { favoriteMovieDelete } from "../features/movieFavoriteDeleteSlice";
import Message from "./Message";

const HomeMovieCard = ({ m, favoriteMovies }) => {
  const dispatch = useDispatch();

  const [loginError, setLoginError] = useState(false);

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const imageURL = "https://image.tmdb.org/t/p/w300/";

  const favorite = favoriteMovies.filter((f) => f.imdb_id === m.id);

  const addFavoriteHandler = () => {
    if (userInfo && userInfo._id) {
      dispatch(
        favoriteMovieAdd({
          id: m.id,
          title: m.title,
          poster_path: m.poster_path,
        })
      );
    } else {
      setLoginError(true);
    }
  };

  const deleteFavoriteHandler = () => {
    dispatch(
      favoriteMovieDelete({
        id: m.id,
      })
    );
  };

  const loginErrorReset = () => {
    setLoginError(false);
  };

  return (
    <div className="movie-wrap" key={m.id}>
      {loginError && (
        <Message
          loginErrorReset={loginErrorReset}
          type="error"
          message="Login or register to add to favorites"
        />
      )}
      <Link to={`/movie/${m.id}`}>
        <img
          className="poster-img"
          src={`${imageURL}${m.poster_path}`}
          alt={m.title}
        />
        <div>
          <h3>{m.title}</h3>
        </div>
      </Link>
      {favorite && favorite.length !== 0 ? (
        <button onClick={deleteFavoriteHandler} className="yellow-star">
          ⭐
        </button>
      ) : (
        <button onClick={addFavoriteHandler} className="white-star">
          ⭐
        </button>
      )}
    </div>
  );
};

export default HomeMovieCard;
