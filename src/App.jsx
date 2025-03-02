import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Sneakpeek from "./Sneakpeek";
import Homepage from "./Pages/Homepage";
import MovieDetail from "./Pages/MovieDetail"; // NEU: Import der Detailseite
import SeriesDetail from "./Pages/Seriesdetail";
import ReportForm from "./Pages/report";
import CategoriesPage from "./Pages/Categoriespage";
import GenrePage from "./Pages/GenrePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Automatische Weiterleitung von "/" nach "/homepage" */}
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route
          path="/series/:id/season/:season/episode/:episode"
          element={<SeriesDetail />}
        />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/category" element={<CategoriesPage />} />
        <Route path="/category/:type/genre/:id" element={<GenrePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
