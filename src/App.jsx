import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Teams from "./pages/teams";
import Matches from "./pages/matches";
import Favorites from "./pages/favorites";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipos" element={<Teams />} />
          <Route path="/partidos" element={<Matches />} />
          <Route path="/favoritos" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
