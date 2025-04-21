import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      // Filme suchen
      const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=c30d06a2c3872ffd55d0b2eded65b7e1`;
      const movieResponse = await fetch(movieUrl);
      if (!movieResponse.ok)
        throw new Error("Fehler beim Abrufen der Filmdaten.");
      const movieData = await movieResponse.json();
      setMovies(movieData.results || []);

      // Serien suchen
      const seriesUrl = `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=c30d06a2c3872ffd55d0b2eded65b7e1`;
      const seriesResponse = await fetch(seriesUrl);
      if (!seriesResponse.ok)
        throw new Error("Fehler beim Abrufen der Seriendaten.");
      const seriesData = await seriesResponse.json();
      setSeries(seriesData.results || []);
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
            <form onSubmit={handleSubmit}>
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
                  <button className="button is-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {movies.length > 0 && (
        <div className="container">
          <h2 className="subtitle">Film-Suchergebnisse:</h2>
          <div className="columns is-multiline">
            {movies.map((movie) => (
              <div key={movie.id} className="column is-one-third">
                <div
                  className="card"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/movie/${movie.id}`)}
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

      {series.length > 0 && (
        <div className="container">
          <h2 className="subtitle">Serien-Suchergebnisse:</h2>
          <div className="columns is-multiline">
            {series.map((tv) => (
              <div key={tv.id} className="column is-one-third">
                <div
                  className="card"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/series/${tv.id}/season/1/episode/1`)
                  }
                >
                  <div className="card-image">
                    <figure className="image is-4by5">
                      {tv.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
                          alt={tv.name}
                        />
                      ) : (
                        <p>Kein Bild verfügbar</p>
                      )}
                    </figure>
                  </div>
                  <div className="card-content">
                    <p className="title is-5">{tv.name}</p>
                    <p className="subtitle is-6">
                      {tv.first_air_date?.split("-")[0]}
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
