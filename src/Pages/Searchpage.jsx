import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("movie"); // "movie" oder "tv"
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return;

    try {
      const url = `https://api.themoviedb.org/3/search/${searchType}?query=${query}&api_key=c30d06a2c3872ffd55d0b2eded65b7e1`;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("Fehler beim Abrufen der Suchergebnisse.");
      const data = await response.json();
      setResults(data.results);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResults([]);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Suche nach Filmen oder Serien</h1>

      {/* Eingabefeld */}
      <div className="field has-addons">
        <div className="control">
          <input
            type="text"
            className="input"
            placeholder="Titel eingeben..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="control">
          <button className="button is-primary" onClick={handleSearch}>
            Suchen
          </button>
        </div>
      </div>

      {/* Auswahl: Filme oder Serien */}
      <div className="field">
        <label className="label">Suchtyp</label>
        <div className="control">
          <div className="select">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="movie">Filme</option>
              <option value="tv">Serien</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fehlermeldung anzeigen */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Suchergebnisse anzeigen */}
      <div className="columns is-multiline">
        {results.map((item) => (
          <div key={item.id} className="column is-one-quarter">
            <div
              className="card"
              onClick={() => navigate(`/${searchType}/${item.id}`)}
            >
              <div className="card-image">
                <figure className="image is-4by5">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                        : "https://via.placeholder.com/300x450"
                    }
                    alt={item.name || item.title}
                  />
                </figure>
              </div>
              <div className="card-content">
                <p className="title is-5">{item.name || item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
