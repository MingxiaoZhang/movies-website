import React from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import {Routes, Route} from "react-router-dom";
import MovieInfoPage from "./pages/MovieInfoPage";
import Navbar from "./components/Navbar";
import { PageRoutes } from './routes/pageRoutes'
import MoviesListPage from "./pages/MoviesListPage";

function App() {
  return (
      <>
          <Navbar />
          <Routes>
              <Route path={'/'} element={<MainPage />}/>
              <Route path={PageRoutes.HOME} element={<MainPage />}/>
              <Route path={PageRoutes.MOVIE_INFO_ROUTE} element={<MovieInfoPage />}/>
              <Route path={PageRoutes.MOVIE_LIST} element={<MoviesListPage />}/>
          </Routes>
      </>
  );
}

export default App;
