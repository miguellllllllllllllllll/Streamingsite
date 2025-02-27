import { useState } from "react";

function Searchbar() {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) {
      console.log("Bitte geben Sie einen Suchbegriff ein.");
      return;
    }

    try {
      // Beispiel-API-Aufruf mit VidSrc
      const response = await fetch(
        ` https://vidsrc.xyz/embed/tv?search=${query}`
      );
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Daten von VidSrc.");
      }

      const data = await response.json();
      console.log("Suchergebnisse:", data);

      if (data.results && data.results.length > 0) {
        console.log("Erste Ergebnisse:", data.results.slice(0, 5));
      } else {
        console.log("Keine Ergebnisse gefunden.");
      }
    } catch (error) {
      console.error("Fehler:", error.message);
    }
  };

  return (
    <>
      <h1 className="title" style={{ paddingTop: "50px" }}>
        Stream anything you desire!
      </h1>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input is-rounded"
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="control">
                <button className="button is-primary" onClick={handleSearch}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchbar;
