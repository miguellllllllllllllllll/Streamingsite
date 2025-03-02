import { useState } from "react";
import "../App.css";
import MovieCast from "../Moviecast";
import Searchbar from "../Searchbar";
import Sneakpeek from "../Sneakpeek";
import MovieDetail from "./MovieDetail";
import SeriesDetail from "./SeriesDetail";

function Homepage() {
  const [searchResult, setSearchResult] = useState(null);
  const [type, setType] = useState(null); // "movie" oder "series"

  const handleSearch = (result) => {
    if (result?.media_type === "movie") {
      setSearchResult(result.id);
      setType("movie");
    } else if (result?.media_type === "tv") {
      setSearchResult(result.id);
      setType("series");
    }
  };

  return (
    <div className="container">
      {/* Suchleiste */}
      <Searchbar onSearch={handleSearch} />

      {/* Falls ein Film oder eine Serie gefunden wurde */}
      {searchResult ? (
        type === "movie" ? (
          <MovieDetail id={searchResult} />
        ) : (
          <SeriesDetail id={searchResult} />
        )
      ) : (
        <p>Bitte einen Film oder eine Serie suchen...</p>
      )}

      {/* Sneak Peek (Vorschläge) */}
      <Sneakpeek />
    </div>
  );
}

export default Homepage;
