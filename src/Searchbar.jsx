import { useState } from "react";
import { useNavigate } from "react-router-dom"; // NEU

function Searchbar() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // NEU: Navigation-Funktion

  const handleSearch = async () => {
    if (!query) return;

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=c30d06a2c3872ffd55d0b2eded65b7e1`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Fehler beim Abrufen der Filmdaten.");

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1 className="title" style={{ paddingTop: "50px" }}>
        Stream anything you desire!
      </h1>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input is-rounded"
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="control">
                <button className="button is-primary" onClick={handleSearch}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fehler anzeigen */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Suchergebnisse mit Klick-Funktion */}
      {movies.length > 0 && (
        <div className="container">
          <h2 className="subtitle">Suchergebnisse:</h2>
          <div className="columns is-multiline">
            {movies.map((movie) => (
              <div key={movie.id} className="column is-one-third">
                <div
                  className="card"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/movie/${movie.id}`)} // LEITET WEITER
                >
                  <div className="card-image">
                    <figure className="image is-4by5">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          alt={movie.title}
                        />
                      ) : (
                        <p>Kein Bild verfügbar</p>
                      )}
                    </figure>
                  </div>
                  <div className="card-content">
                    <p className="title is-5">{movie.title}</p>
                    <p className="subtitle is-6">
                      {movie.release_date?.split("-")[0]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Searchbar;
