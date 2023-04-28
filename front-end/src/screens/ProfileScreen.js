import React, { useState, useEffect } from "react";
import "../style/profileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import MovieCardProfile from "../components/MovieCardProfile";
import { details } from "../features/userDetailsSlice";
import { update } from "../features/userUpdateSlice";
import { favoriteUserMovies } from "../features/movieUserFavoritesSlice";
import { getMovieRecommendations } from "../features/movieRecommendationsSlice";
import SimilarMovieCard from "../components/SimilarMovieCard";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userInfo = useSelector((state) => state.userDetails.userInfo);
  const favoriteMovies = useSelector((state) => state.movieUserFavorite.movies);
  const recommendations = useSelector(
    (state) => state.movieRecommendations.movies
  );

  useEffect(() => {
    if (userInfo && userInfo.name) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    } else {
      dispatch(details());
    }
    if (favoriteMovies.length === 0) {
      dispatch(favoriteUserMovies());
    }
    if (favoriteMovies) {
      dispatch(getMovieRecommendations(favoriteMovies));
    }
  }, [userInfo, dispatch, favoriteMovies]);

  const updateHandler = () => {
    if (password === confirmPassword) {
      dispatch(
        update({
          name,
          email,
          password,
        })
      );
      dispatch(details());
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="profile-wrap">
      <h2 className="profile-title">User Profile</h2>
      <section className="profile-box">
        <div className="user-info-box">
          <form className="register-form">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Confirm password: </label>
            <input
              type="password"
              name="password"
              id="confirmPassword"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              className="subscribe-btn"
              type="button"
              onClick={updateHandler}
            >
              Update
            </button>
          </form>
        </div>
        <div className="profile-movies-box">
          <h2>Favorite Movies</h2>
          <div className="user-favorite-box">
            {favoriteMovies &&
              favoriteMovies.map((m) => {
                return <MovieCardProfile key={m.imdb_id} m={m} />;
              })}
          </div>
          <h2>Recommendations</h2>
          <div className="user-favorite-box">
            {recommendations &&
              recommendations.map(
                (m, index) =>
                  m.poster_path && <SimilarMovieCard key={index} m={m} />
              )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileScreen;
