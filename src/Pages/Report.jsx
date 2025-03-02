import React from "react";
import "bulma/css/bulma.min.css";
import report from "/src/assets/report.png";

const ReportForm = () => {
  return (
    <div className="container">
      <h1 className="title has-text-centered">Report Form</h1>

      <div className="columns is-vcentered">
        {/* Linke Seite mit Bild und Text */}
        <div className="column is-half has-text-centered">
          <figure className="image">
            <img
              src={report} // Hier dein Bild-URL einfügen
              alt="Report Illustration"
            />
          </figure>
          <p className="mt-3">
            Falls du ein Problem entdeckt hast, kannst du es hier melden. Fülle
            einfach das Formular aus!
          </p>
        </div>

        {/* Rechte Seite mit Formular */}
        <div className="column is-half">
          <form className="box">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Your name" />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Your email"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Report</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Describe the issue"
                ></textarea>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
              <div className="control">
                <button className="button is-link is-light">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
