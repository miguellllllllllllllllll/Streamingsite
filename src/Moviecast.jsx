import { useState, useEffect } from "react";

function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return; // Falls keine ID da ist, nichts tun

    const fetchCast = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c30d06a2c3872ffd55d0b2eded65b7e1`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("API-Request fehlgeschlagen");

        const data = await response.json();
        setCast(data.cast || []); // Falls "cast" nicht existiert, setze leeres Array
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCast();
  }, [movieId]); // Aktualisiert sich, wenn sich die Movie-ID ändert

  return (
    <div>
      <h2>Movie Cast</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cast.length > 0 ? (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <strong>{actor.name}</strong> als {actor.character}
            </li>
          ))}
        </ul>
      ) : (
        <p>Keine Cast-Daten gefunden.</p>
      )}
    </div>
  );
}

export default MovieCast;
