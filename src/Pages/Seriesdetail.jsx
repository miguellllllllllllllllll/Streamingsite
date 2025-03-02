import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SeriesDetail() {
  const { id, season, episode } = useParams(); // Serien-ID, Staffel und Episode aus URL
  const navigate = useNavigate();
  const [episodeData, setEpisodeData] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Holt die Episoden-Daten
    const fetchEpisode = async () => {
      try {
        const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?api_key=c30d06a2c3872ffd55d0b2eded65b7e1&language=en-US`;
        const response = await fetch(url);
        if (!response.ok)
          throw new Error("Fehler beim Abrufen der Episodendaten.");
        const data = await response.json();
        setEpisodeData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    // Holt alle Staffeln der Serie
    const fetchSeasons = async () => {
      try {
        const url = `https://api.themoviedb.org/3/tv/${id}?api_key=c30d06a2c3872ffd55d0b2eded65b7e1&language=en-US`;
        const response = await fetch(url);
        if (!response.ok)
          throw new Error("Fehler beim Abrufen der Staffel-Liste.");
        const data = await response.json();
        setSeasons(data.seasons);
      } catch (error) {
        setError(error.message);
      }
    };

    // Holt alle Episoden der aktuellen Staffel
    const fetchEpisodes = async () => {
      try {
        const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=c30d06a2c3872ffd55d0b2eded65b7e1&language=en-US`;
        const response = await fetch(url);
        if (!response.ok)
          throw new Error("Fehler beim Abrufen der Episoden-Liste.");
        const data = await response.json();
        setEpisodes(data.episodes);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEpisode();
    fetchSeasons();
    fetchEpisodes();
  }, [id, season, episode]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!episodeData) return <p>Lädt...</p>;

  // Berechnet vorherige & nächste Episode
  const currentEpisodeIndex = episodes.findIndex(
    (ep) => ep.episode_number === Number(episode)
  );
  const prevEpisode =
    currentEpisodeIndex > 0 ? episodes[currentEpisodeIndex - 1] : null;
  const nextEpisode =
    currentEpisodeIndex < episodes.length - 1
      ? episodes[currentEpisodeIndex + 1]
      : null;

  // Navigation zu neuer Staffel/Episode
  const handleSeasonChange = (e) => {
    navigate(`/series/${id}/season/${e.target.value}/episode/1`);
  };

  const handleEpisodeChange = (e) => {
    navigate(`/series/${id}/season/${season}/episode/${e.target.value}`);
  };

  return (
    <div className="container mt-5">
      {/* 🎬 Banner mit Serien-Hintergrund */}
      {episodeData.still_path && (
        <div
          className="hero is-medium"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${episodeData.still_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-body has-background-dark p-5">
            <h1 className="title has-text-white">{episodeData.name}</h1>
            <p className="subtitle has-text-white">{episodeData.air_date}</p>
          </div>
        </div>
      )}

      {/* 🎥 Episoden-Details */}
      <div className="columns mt-5">
        {/* 🎭 Poster */}
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              {episodeData.still_path ? (
                <figure className="image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${episodeData.still_path}`}
                    alt={episodeData.name}
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
            <p>{episodeData.overview}</p>
            <p>
              <strong>Bewertung:</strong> ⭐ {episodeData.vote_average} / 10
            </p>
          </div>

          {/* 📦 Navigation & Auswahl-Box */}
          <div className="box mt-5">
            <div className="columns">
              {/* 🔽 Auswahl für Staffel & Episode */}
              <div className="column">
                <h3 className="title is-5">Staffel & Episode wählen</h3>
                <label className="label">Staffel:</label>
                <div className="select is-fullwidth mb-2">
                  <select onChange={handleSeasonChange} value={season}>
                    {seasons.map((s) => (
                      <option key={s.season_number} value={s.season_number}>
                        Staffel {s.season_number}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="label">Episode:</label>
                <div className="select is-fullwidth">
                  <select onChange={handleEpisodeChange} value={episode}>
                    {episodes.map((ep) => (
                      <option key={ep.episode_number} value={ep.episode_number}>
                        {ep.episode_number}. {ep.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 🔄 Navigation zu vorheriger/nächster Episode */}
              <div className="column has-text-centered">
                <h3 className="title is-5">Navigation</h3>
                {prevEpisode && (
                  <button
                    className="button is-info is-fullwidth mb-2"
                    onClick={() =>
                      navigate(
                        `/series/${id}/season/${season}/episode/${prevEpisode.episode_number}`
                      )
                    }
                  >
                    ⬅ Vorherige: {prevEpisode.name}
                  </button>
                )}
                {nextEpisode && (
                  <button
                    className="button is-success is-fullwidth"
                    onClick={() =>
                      navigate(
                        `/series/${id}/season/${season}/episode/${nextEpisode.episode_number}`
                      )
                    }
                  >
                    Nächste: {nextEpisode.name} ➡
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 📺 Serien-Trailer */}
          <div className="box has-text-centered">
            <iframe
              src={`https://vidsrc.me/embed/tv?tmdb=${id}`}
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

export default SeriesDetail;
