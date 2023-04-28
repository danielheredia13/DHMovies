import React from "react";
import "../style/searchBar.css";

const SearchBar = ({ queryHandler, searchHandler, query, enterKey }) => {
  return (
    <section className="search-box">
      <input
        onKeyDown={enterKey}
        onChange={queryHandler}
        value={query}
        type="text"
        placeholder="Search for a Movie"
        className="search-input"
      ></input>
      <button onClick={searchHandler} className="search-btn" type="button">
        Search
      </button>
    </section>
  );
};

export default SearchBar;
