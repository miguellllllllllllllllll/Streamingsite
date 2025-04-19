import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Sneakpeek from "./Sneakpeek";
import Homepage from "./Pages/Homepage";
import MovieDetail from "./Pages/MovieDetail";
import SeriesDetail from "./Pages/Seriesdetail";
import ReportForm from "./Pages/report";
import CategoriesPage from "./Pages/Categoriespage";
import GenrePage from "./Pages/GenrePage";
import LoginPage from "./Pages/Loginpage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/homepage" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/homepage" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {isAuthenticated ? (
          <>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route
              path="/series/:id/season/:season/episode/:episode"
              element={<SeriesDetail />}
            />
            <Route path="/report" element={<ReportForm />} />
            <Route path="/category" element={<CategoriesPage />} />
            <Route path="/category/:type/genre/:id" element={<GenrePage />} />
          </>
        ) : (
          // fallback for all routes if not authenticated
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
