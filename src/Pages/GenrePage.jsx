import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GenrePage = () => {
  const { type, id } = useParams(); // Genre-Typ (movie/tv) & Genre-ID
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=c30d06a2c3872ffd55d0b2eded65b7e1&with_genres=${id}&language=en-US`;
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error);
      }
    };

    fetchMovies();
  }, [type, id]);

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">
        Gefundene {type === "movie" ? "Filme" : "Serien"}
      </h1>
      <div className="columns is-multiline">
        {movies.map((movie) => (
          <div key={movie.id} className="column is-one-quarter">
            <div className="card">
              <div className="card-image">
                {movie.poster_path ? (
                  <figure className="image">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                    />
                  </figure>
                ) : (
                  <p className="has-text-centered">Kein Bild verfügbar</p>
                )}
              </div>
              <div className="card-content">
                <p className="title is-5">{movie.title || movie.name}</p>
                <p className="subtitle is-6">⭐ {movie.vote_average} / 10</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
