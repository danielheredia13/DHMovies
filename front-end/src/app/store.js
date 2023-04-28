import { configureStore } from "@reduxjs/toolkit";
import movieDetailsReducer from "../features/movieDetailsSlice";
import userRegisterReducer from "../features/userRegisterSlice";
import userLoginReducer from "../features/userLoginSlice";
import userUpdateReducer from "../features/userUpdateSlice";
import userDetailsReducer from "../features/userDetailsSlice";
import movieFavoriteAddReducer from "../features/movieFavoriteAddSlice";
import movieUserFavoritesReducer from "../features/movieUserFavoritesSlice";
import movieFavoriteDeleteReducer from "../features/movieFavoriteDeleteSlice";
import moviePopularReducer from "../features/moviePopularSlice";
import movieSearchReducer from "../features/movieSearchSlice";
import movieCastCrewReducer from "../features/movieCastCrewSlice";
import movieSimilarReducer from "../features/movieSimilarSlice";
import movieRecommendationsReducer from "../features/movieRecommendationsSlice";

const store = configureStore({
  reducer: {
    movieDetails: movieDetailsReducer,
    movieFavoriteAdd: movieFavoriteAddReducer,
    movieFavoriteDelete: movieFavoriteDeleteReducer,
    movieUserFavorite: movieUserFavoritesReducer,
    moviePopular: moviePopularReducer,
    movieSearch: movieSearchReducer,
    movieCastCrew: movieCastCrewReducer,
    movieSimilar: movieSimilarReducer,
    movieRecommendations: movieRecommendationsReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userUpdate: userUpdateReducer,
    userDetails: userDetailsReducer,
  },
});

export default store;
