import React from "react";
import "../style/castCard.css";

const CastCard = ({ a }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w300/";

  return (
    <div className="cast-wrap">
      <img src={`${imageUrl}${a.profile_path}`} />
      <h5>{a.name}</h5>
      <h5 className="character">{a.character}</h5>
    </div>
  );
};

export default CastCard;
