import React from "react";
import "../style/heroImage.css";

function HeroImage({ popular }) {
  let movie = popular[10];
  const imageLocation = movie && movie.backdrop_path;

  return (
    <div
      className="hero-wrap"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${imageLocation}')`,
      }}
    >
      <div className="hero-display">
        <div className="hero-text-wraper">
          <h4 className="hero-title">{movie && movie.title}</h4>
          <p className="hero-overview">{movie && movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
export default HeroImage;
