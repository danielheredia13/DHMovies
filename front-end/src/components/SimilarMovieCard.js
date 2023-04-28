import React from "react";
import "../style/similarMovieCard.css";
import { Link } from "react-router-dom";

const SimilarMovieCard = ({ m }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w300/";

  return (
    <Link to={`/movie/${m.id}`}>
      <div className="similar-wrap">
        <img src={`${imageUrl}${m.poster_path}`} />
        <h5>{m.title}</h5>
      </div>
    </Link>
  );
};

export default SimilarMovieCard;
