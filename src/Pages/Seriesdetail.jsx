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
  const servers = [
    { name: "Vidsrc.me", domain: "vidsrc.me" },
    { name: "Vidsrc.to", domain: "vidsrc.to" },
    { name: "Vidsrc.cc", domain: "vidsrc.cc" },
  ];

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
        setImdbId(data.external_ids?.imdb_id || null);
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

  // 📺 Dynamische Streaming-URL je nach Server
  const getStreamingUrl = () => {
    if (selectedServer === "vidsrc.cc") {
      const version = "v2"; // oder "v3"
      const seriesId = imdbId ? imdbId : id; // Falls keine IMDb-ID verfügbar
      return `https://vidsrc.cc/${version}/embed/tv/${seriesId}/${season}/${episode}?autoPlay=true`;
    } else {
      return `https://${selectedServer}/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
    }
  };

  return (
    <div className="container mt-5">
      {/* ... (hero und restlicher Code bleibt gleich) */}

      <div className="box has-text-centered">
        <h3 className="title is-5 mb-3">Streaming Server wählen</h3>
        <div className="buttons is-centered mb-4">
          {servers.map((server) => (
            <button
              key={server.domain}
              className={`button ${
                selectedServer === server.domain ? "is-primary" : "is-light"
              }`}
              onClick={() => setSelectedServer(server.domain)}
            >
              {server.name}
            </button>
          ))}
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
  );
}

export default SeriesDetail;
