import asyncHandler from "express-async-handler";
import axios from "axios";

// Desc    Get Popular movies
// Route   GET /api/config/movies/popular
// Access  Public

const popularMovie = asyncHandler(async (req, res) => {
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );

  if (data) {
    let movies = data.results;

    res.json(movies);
  } else {
    res.status(404);
    throw new Error("Movies not Found");
  }
});

// Desc    Get Movies Search
// Route   POST /api/config/movies/search
// Access  Public

const movieSearch = asyncHandler(async (req, res) => {
  const { q } = req.body;

  const { data } = await axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${q}&language=en-US&page=1&include_adult=false`
  );

  if (data) {
    let movies = data.results;

    res.json(movies);
  } else {
    res.status(404);
    throw new Error("Movies not Found");
  }
});

// Desc    Get Movie Details
// Route   POST /api/config/movies/details
// Access  Public

const movieDetails = asyncHandler(async (req, res) => {
  const { movieId } = req.body;

  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`
  );

  if (data) {
    res.json(data);
  } else {
    res.status(404);
    throw new Error("Movie not Found");
  }
});

// Desc    Get Movie Credits
// Route   POST /api/config/movies/credits
// Access  Public

const movieCredits = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  );

  if (data) {
    res.json(data);
  } else {
    res.status(404);
    throw new Error("Movie not Found");
  }
});

// Desc    Get Similar Movies
// Route   POST /api/config/movies/similar
// Access  Public

const movieSimilar = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );

  if (data) {
    let movies = data.results;

    res.json(movies);
  } else {
    res.status(404);
    throw new Error("Movies not Found");
  }
});

// Desc    Get Movies Recommendations
// Route   POST /api/config/movies/recommendations
// Access  Public

const movieRecommendations = asyncHandler(async (req, res) => {
  const { favoriteMovies } = req.body;

  switch (favoriteMovies.length) {
    case 1:
      const { data } = await axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[0].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      if (data) {
        res.json(data.results.slice(0, 10));
      } else {
        res.status(404);
        throw new Error("Movies not Found");
      }

      break;

    case 2:
      const fetch1 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[0].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch2 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[1].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const [{ data: data2 }, { data: data3 }] = await Promise.all([
        fetch1,
        fetch2,
      ]);

      const combine = [
        ...data2.results.slice(0, 10),
        ...data3.results.slice(0, 10),
      ];

      if (combine) {
        res.json(combine);
      } else {
        res.status(404);
        throw new Error("Movies not Found");
      }

      break;

    case 3:
      const fetch3 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[0].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch4 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[1].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch5 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[2].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const [{ data: data4 }, { data: data5 }, { data: data6 }] =
        await Promise.all([fetch3, fetch4, fetch5]);

      const combine1 = [
        ...data4.results.slice(0, 7),
        ...data5.results.slice(0, 6),
        ...data6.results.slice(0, 7),
      ];

      if (combine1) {
        res.json(combine1);
      } else {
        res.status(404);
        throw new Error("Movies not Found");
      }

      break;

    case 4:
      const fetch6 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[0].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch7 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[1].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch8 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[2].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch9 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[3].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const [
        { data: data7 },
        { data: data8 },
        { data: data9 },
        { data: data10 },
      ] = await Promise.all([fetch6, fetch7, fetch8, fetch9]);

      const combine2 = [
        ...data7.results.slice(0, 5),
        ...data8.results.slice(0, 5),
        ...data9.results.slice(0, 5),
        ...data10.results.slice(0, 5),
      ];

      if (combine2) {
        res.json(combine2);
      } else {
        res.status(404);
        throw new Error("Movies not Found");
      }

      break;

    case 5:
      const fetch10 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[0].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch11 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[1].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch12 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[2].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch13 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[3].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch14 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[4].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const [
        { data: data11 },
        { data: data12 },
        { data: data13 },
        { data: data14 },
        { data: data15 },
      ] = await Promise.all([fetch10, fetch11, fetch12, fetch13, fetch14]);

      const combine3 = [
        ...data11.results.slice(0, 4),
        ...data12.results.slice(0, 4),
        ...data13.results.slice(0, 4),
        ...data14.results.slice(0, 4),
        ...data15.results.slice(0, 4),
      ];

      if (combine3) {
        res.json(combine3);
      } else {
        res.status(404);
        throw new Error("Movies not Found");
      }

      break;

    default:
      const fetch15 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[0].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch16 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[1].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch17 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[2].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch18 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[3].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const fetch19 = axios(
        `https://api.themoviedb.org/3/movie/${favoriteMovies[4].imdb_id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
      );

      const [
        { data: data16 },
        { data: data17 },
        { data: data18 },
        { data: data19 },
        { data: data20 },
      ] = await Promise.all([fetch15, fetch16, fetch17, fetch18, fetch19]);

      const combine4 = [
        ...data16.results.slice(0, 4),
        ...data17.results.slice(0, 4),
        ...data18.results.slice(0, 4),
        ...data19.results.slice(0, 4),
        ...data20.results.slice(0, 4),
      ];

      if (combine4) {
        res.json(combine4);
      } else {
        res.status(404);
        throw new Error("Movies not Found");
      }
      break;
  }
});

export {
  popularMovie,
  movieSearch,
  movieDetails,
  movieCredits,
  movieSimilar,
  movieRecommendations,
};
