import { useState } from "react"; // <-- useState importieren!
import "../App.css";
import MovieCast from "../Moviecast";
import Navbar from "../Navbar";
import Searchbar from "../Searchbar";
import Sneakpeek from "../Sneakpeek";

function Homepage() {
  const [movieId, setMovieId] = useState(null);

  return (
    <>
      <div>
        <Searchbar onSearch={setMovieId} />
        {movieId ? (
          <MovieCast movieId={movieId} />
        ) : (
          <p>Bitte einen Film suchen...</p>
        )}
      </div>
      <iframe
        src="https://vidsrc.me/embed/movie?imdb=tt0345950"
        style={{ width: "400px", height: "200px" }}
        frameBorder="0"
        referrerPolicy="origin"
        allowFullScreen
      ></iframe>
      <Sneakpeek />
    </>
  );
}

export default Homepage;
