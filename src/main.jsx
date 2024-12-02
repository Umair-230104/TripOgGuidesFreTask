import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Trips from "./components/Trips";
import Guides from "./components/Guides";
import TripDetails from "./components/TripDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Trips />} />
        <Route path="guides" element={<Guides />} />
        <Route path="trip/:id" element={<TripDetails />} />
      </Route>
    </Routes>
  </Router>
);
