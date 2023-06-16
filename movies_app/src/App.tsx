import React from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import {Routes, Route} from "react-router-dom";
import MovieInfoPage from "./pages/MovieInfoPage";

function App() {
  return (
      <Routes>
          <Route path={"/"} element={<MainPage />}/>
          <Route path={"/movie-info/:id"} element={<MovieInfoPage />}/>
      </Routes>
  );
}

export default App;
