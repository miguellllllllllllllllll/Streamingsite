import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SeriesDetail() {
  const { id, season, episode } = useParams();
  const navigate = useNavigate();
  const [episodeData, setEpisodeData] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);
  const [imdbId, setImdbId] = useState(null);
  const [selectedServer, setSelectedServer] = useState("vidsrc.me");

  useEffect(() => {
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

    const fetchExternalIds = async () => {
      try {
        const url = `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=c30d06a2c3872ffd55d0b2eded65b7e1`;
        const response = await fetch(url);
        if (!response.ok)
          throw new Error("Fehler beim Abrufen der externen IDs.");
        const data = await response.json();
        setImdbId(data.imdb_id);
      } catch (error) {
        console.error("Fehler beim Laden der IMDb-ID:", error);
      }
    };

    fetchEpisode();
    fetchSeasons();
    fetchEpisodes();
    fetchExternalIds();
  }, [id, season, episode]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!episodeData) return <p>Lädt...</p>;

  const currentEpisodeIndex = episodes.findIndex(
    (ep) => ep.episode_number === Number(episode)
  );
  const prevEpisode =
    currentEpisodeIndex > 0 ? episodes[currentEpisodeIndex - 1] : null;
  const nextEpisode =
    currentEpisodeIndex < episodes.length - 1
      ? episodes[currentEpisodeIndex + 1]
      : null;

  const handleSeasonChange = (e) => {
    navigate(`/series/${id}/season/${e.target.value}/episode/1`);
  };

  const handleEpisodeChange = (e) => {
    navigate(`/series/${id}/season/${season}/episode/${e.target.value}`);
  };

  const getStreamingUrl = () => {
    const isImdb = imdbId?.startsWith("tt");
    const fallbackId = isImdb ? imdbId : id;

    switch (selectedServer) {
      case "vidsrc.cc":
        return `https://vidsrc.cc/v2/embed/tv/${fallbackId}/${season}/${episode}?autoPlay=true`;

      case "vidlink.pro":
        return `https://vidlink.pro/tv/${id}/${season}/${episode}`; // nur TMDB-ID
      case "vidsrc.me":
      default:
        return `https://${selectedServer}/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
    }
  };

  return (
    <div className="container mt-5">
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

      <div className="columns mt-5">
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

        <div className="column">
          <div className="content">
            <h2 className="title is-4">Zusammenfassung</h2>
            <p>{episodeData.overview}</p>
            <p>
              <strong>Bewertung:</strong> ⭐ {episodeData.vote_average} / 10
            </p>
          </div>

          <div className="box mt-5">
            <div className="columns">
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

          {/* Streaming Server Auswahl */}
          <div className="box has-text-centered">
            <h3 className="title is-5">Streaming-Server wechseln</h3>
            <div className="buttons is-centered">
              <button
                className={`button ${
                  selectedServer === "vidsrc.me" ? "is-primary" : ""
                }`}
                onClick={() => setSelectedServer("vidsrc.me")}
              >
                vidsrc.me
              </button>
              <button
                className={`button ${
                  selectedServer === "vidsrc.cc" ? "is-primary" : ""
                }`}
                onClick={() => setSelectedServer("vidsrc.cc")}
              >
                vidsrc.cc
              </button>

              <button
                className={`button ${
                  selectedServer === "vidlink.pro" ? "is-primary" : ""
                }`}
                onClick={() => setSelectedServer("vidlink.pro")}
              >
                vidlink.pro
              </button>
            </div>

            <iframe
              src={getStreamingUrl()}
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
