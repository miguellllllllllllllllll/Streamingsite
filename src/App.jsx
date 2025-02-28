import "./App.css";
import MovieCast from "./Moviecast";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Sneakpeek from "./Sneakpeek";

function App() {
  return (
    <>
      <Navbar />
      <Searchbar />
      <MovieCast />
      <iframe
        src="https://vidsrc.me/embed/movie?imdb=tt0345950"
        style={{ width: "400px", height: "200px" }} // <-- Doppelte geschweifte Klammern!
        frameBorder="0" // <-- camelCase für JSX
        referrerPolicy="origin" // <-- camelCase für JSX
        allowFullScreen // <-- kein `=`
      ></iframe>
      <Sneakpeek />
    </>
  );
}

export default App;
