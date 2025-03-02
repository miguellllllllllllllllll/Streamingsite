import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoriesPage() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [category, setCategory] = useState("movies"); // Standardmäßig "movies"
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Lade alle Genres
    const fetchGenres = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=c30d06a2c3872ffd55d0b2eded65b7e1&language=en-US"
      );
      const data = await response.json();
      setGenres(data.genres);
    };

    // 🔹 Lade beliebte Filme
    const fetchMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=c30d06a2c3872ffd55d0b2eded65b7e1&language=en-US"
      );
      const data = await response.json();
      setMovies(data.results);
    };

    // 🔹 Lade beliebte Serien
    const fetchSeries = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=c30d06a2c3872ffd55d0b2eded65b7e1&language=en-US"
      );
      const data = await response.json();
      setSeries(data.results);
    };

    fetchGenres();
    fetchMovies();
    fetchSeries();
  }, []);

  // 🔹 Filtert Filme oder Serien nach Genre
  const filteredContent = (category === "movies" ? movies : series).filter(
    (item) => !selectedGenre || item.genre_ids.includes(selectedGenre)
  );

  return (
    <div className="container mt-5">
      <h1 className="title">Beliebte Filme & Serien</h1>

      {/* 🔹 Kategorien-Auswahl */}
      <div className="buttons">
        <button
          className={`button ${category === "movies" ? "is-primary" : ""}`}
          onClick={() => setCategory("movies")}
        >
          🎥 Filme
        </button>
        <button
          className={`button ${category === "series" ? "is-primary" : ""}`}
          onClick={() => setCategory("series")}
        >
          📺 Serien
        </button>
      </div>

      {/* 🔹 Genre-Auswahl */}
      <div className="select mb-3">
        <select onChange={(e) => setSelectedGenre(Number(e.target.value))}>
          <option value="">Alle Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Content-Grid */}
      <div className="columns is-multiline">
        {filteredContent.map((item) => (
          <div key={item.id} className="column is-one-quarter">
            <div
              className="card"
              onClick={() =>
                navigate(
                  category === "movies"
                    ? `/movie/${item.id}`
                    : `/series/${item.id}/season/1/episode/1`
                )
              }
              style={{ cursor: "pointer" }}
            >
              <div className="card-image">
                <figure className="image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                </figure>
              </div>
              <div className="card-content">
                <p className="title is-6">{item.title || item.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
