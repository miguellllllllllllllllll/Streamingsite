import { useEffect, useState } from "react";

function MovieCast() {
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      const url = "https://imdb236.p.rapidapi.com/imdb/tt7631058/cast";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "ff7374ffd7mshd8c811ade092aadp130b77jsn27ad0334ec32",
          "x-rapidapi-host": "imdb236.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("API-Request fehlgeschlagen");
        const result = await response.json();
        setCast(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCast();
  }, []);

  return (
    <div>
      <h2>Movie Cast</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cast ? (
        <ul>
          {cast.actors.map((actor, index) => (
            <li key={index}>
              {actor.name} as {actor.character}
            </li>
          ))}
        </ul>
      ) : (
        <p>Lädt...</p>
      )}
    </div>
  );
}

export default MovieCast;
