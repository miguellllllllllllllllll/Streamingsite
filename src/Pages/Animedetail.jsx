import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AnimeDetail() {
  const { id, episode = "1", type = "sub" } = useParams();
  const navigate = useNavigate();
  const [animeData, setAnimeData] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedServer, setSelectedServer] = useState("vidlink.pro");

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/full`
        );
        if (!response.ok) throw new Error("Fehler beim Laden des Animes.");
        const data = await response.json();
        setAnimeData(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/episodes`
        );
        if (!response.ok) throw new Error("Fehler beim Laden der Episoden.");
        const data = await response.json();
        setEpisodes(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAnime();
    fetchEpisodes();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!animeData) return <p>Lädt...</p>;

  const episodeNumber = parseInt(episode);
  const currentEpisode = episodes.find(
    (e) => e.mal_id === episodeNumber || e.episode_id === episodeNumber
  );
  const prev = episodes[episodeNumber - 2];
  const next = episodes[episodeNumber];

  const handleEpisodeChange = (e) => {
    navigate(`/anime/${id}/episode/${e.target.value}/${type}`);
  };

  const getStreamingUrl = () => {
    return `https://vidlink.pro/anime/${id}/${episode}/${type}?fallback=true`;
  };

  return (
    <div className="container mt-5">
      {animeData.images?.jpg?.large_image_url && (
        <div
          className="hero is-medium"
          style={{
            backgroundImage: `url(${animeData.images.jpg.large_image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-body has-background-dark p-5">
            <h1 className="title has-text-white">{animeData.title}</h1>
            <p className="subtitle has-text-white">{animeData.aired?.string}</p>
          </div>
        </div>
      )}

      <div className="columns mt-5">
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              {animeData.images?.jpg?.image_url ? (
                <figure className="image">
                  <img
                    src={animeData.images.jpg.image_url}
                    alt={animeData.title}
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
            <p>{animeData.synopsis}</p>
            <p>
              <strong>Bewertung:</strong> ⭐ {animeData.score} / 10
            </p>
          </div>

          <div className="box mt-5">
            <h3 className="title is-5">Episode wählen</h3>
            <div className="select is-fullwidth mb-2">
              <select onChange={handleEpisodeChange} value={episode}>
                {episodes.map((ep) => (
                  <option
                    key={ep.mal_id || ep.episode_id}
                    value={ep.episode_id || ep.mal_id}
                  >
                    {ep.episode_id}. {ep.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="buttons mt-2">
              {prev && (
                <button
                  className="button is-info"
                  onClick={() =>
                    navigate(
                      `/anime/${id}/episode/${
                        prev.episode_id || prev.mal_id
                      }/${type}`
                    )
                  }
                >
                  ⬅ Vorherige
                </button>
              )}
              {next && (
                <button
                  className="button is-success"
                  onClick={() =>
                    navigate(
                      `/anime/${id}/episode/${
                        next.episode_id || next.mal_id
                      }/${type}`
                    )
                  }
                >
                  Nächste ➡
                </button>
              )}
            </div>
          </div>

          <div className="box has-text-centered">
            <h3 className="title is-5">Streaming-Server</h3>
            <div className="buttons is-centered">
              <button
                className={`button is-primary`}
                onClick={() => setSelectedServer("vidlink.pro")}
              >
                vidlink.pro
              </button>
            </div>

            <iframe
              src={getStreamingUrl()}
              style={{ width: "100%", maxWidth: "900px", height: "400px" }}
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

export default AnimeDetail;
