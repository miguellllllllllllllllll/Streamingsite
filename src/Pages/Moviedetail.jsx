import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams(); // Holt die Film-ID aus der URL
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=c30d06a2c3872ffd55d0b2eded65b7e1`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Fehler beim Abrufen der Filmdaten.");

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovie();
  }, [id]);

  if (error) return <p className="notification is-danger">{error}</p>;
  if (!movie) return <p className="notification is-info">Lädt...</p>;

  return (
    <div className="container mt-5">
      {/* 🎬 Banner mit Film-Hintergrund */}
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

      {/* 🎥 Film-Details */}
      <div className="columns mt-5">
        {/* 🎭 Poster */}
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

        {/* 🎞️ Infos */}
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

          {/* 📺 Film-Trailer */}
          <div className="box has-text-centered">
            <iframe
              src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
              style={{
                width: "100%",
                maxWidth: "900px",
                height: "400px",
              }}
              frameBorder="0"
              referrerPolicy="origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
