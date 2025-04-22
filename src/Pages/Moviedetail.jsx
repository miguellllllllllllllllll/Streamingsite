import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [imdbId, setImdbId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState("vidsrc.me");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=c30d06a2c3872ffd55d0b2eded65b7e1`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Fehler beim Abrufen der Filmdaten.");
        const data = await response.json();
        setMovie(data);

        const externalUrl = `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=c30d06a2c3872ffd55d0b2eded65b7e1`;
        const externalResponse = await fetch(externalUrl);
        const externalData = await externalResponse.json();
        setImdbId(externalData.imdb_id);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovie();
  }, [id]);

  const renderIframe = () => {
    switch (selectedProvider) {
      case "vidsrc.me":
        return (
          <iframe
            src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
            style={{ width: "100%", maxWidth: "900px", height: "400px" }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        );
      case "vidsrc.cc":
        return imdbId ? (
          <iframe
            src={`https://vidsrc.cc/v2/embed/movie/${imdbId}`}
            style={{ width: "100%", maxWidth: "900px", height: "400px" }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <p>IMDB-ID wird benötigt.</p>
        );
      case "vidlink.pro":
        return (
          <iframe
            src={`https://vidlink.pro/movie/${id}`}
            style={{ width: "100%", maxWidth: "900px", height: "400px" }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        );
      default:
        return <p>Streaming-Anbieter nicht gefunden.</p>;
    }
  };

  if (error) return <p className="notification is-danger">{error}</p>;
  if (!movie) return <p className="notification is-info">Lädt...</p>;

  return (
    <div className="container mt-5">
      {movie.backdrop_path && (
        <div
          className="hero is-medium"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-body has-background-dark p-5">
            <h1 className="title has-text-white">{movie.title}</h1>
            <p className="subtitle has-text-white">{movie.release_date}</p>
          </div>
        </div>
      )}

      <div className="columns mt-5">
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              {movie.poster_path ? (
                <figure className="image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </figure>
              ) : (
                <p className="has-text-centered">Kein Bild verfügbar</p>
              )}
            </div>
          </div>
        </div>

        <div className="column">
          <div className="content">
            <h2 className="title is-4">Zusammenfassung</h2>
            <p>{movie.overview}</p>
            <p>
              <strong>Bewertung:</strong> ⭐ {movie.vote_average} / 10
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres?.map((genre) => genre.name).join(", ")}
            </p>
          </div>

          <div className="box has-text-centered">
            <h3 className="title is-5">Stream wählen</h3>

            <div className="buttons is-centered mb-4">
              <button
                className={`button ${
                  selectedProvider === "vidsrc.me" ? "is-primary" : ""
                }`}
                onClick={() => setSelectedProvider("vidsrc.me")}
              >
                vidsrc.me
              </button>
              <button
                className={`button ${
                  selectedProvider === "vidsrc.cc" ? "is-primary" : ""
                }`}
                onClick={() => setSelectedProvider("vidsrc.cc")}
                disabled={!imdbId}
              >
                vidsrc.cc
              </button>
              <button
                className={`button ${
                  selectedProvider === "vidlink.pro" ? "is-primary" : ""
                }`}
                onClick={() => setSelectedProvider("vidlink.pro")}
              >
                Vidlink.pro
              </button>
            </div>

            {renderIframe()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
