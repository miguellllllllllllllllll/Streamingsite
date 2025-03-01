import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Sneakpeek from "./Sneakpeek";
import Homepage from "./Pages/Homepage";
import MovieDetail from "./Pages/MovieDetail"; // NEU: Import der Detailseite

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Automatische Weiterleitung von "/" nach "/homepage" */}
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/movie/:id" element={<MovieDetail />} /> {/* NEUE ROUTE */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
