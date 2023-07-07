import React from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import {Routes, Route} from "react-router-dom";
import MovieInfoPage from "./pages/MovieInfoPage";
import Navbar from "./components/Navbar";
import { PageRoutes } from './routes/pageRoutes'
import MoviesListPage from "./pages/MoviesListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  return (
      <>
          <Navbar />
          <Routes>
              <Route path={'/'} element={<MainPage />}/>
              <Route path={PageRoutes.HOME} element={<MainPage />}/>
              <Route path={PageRoutes.MOVIE_INFO_ROUTE} element={<MovieInfoPage />}/>
              <Route path={PageRoutes.MOVIE_LIST} element={<MoviesListPage />}/>
              <Route path={PageRoutes.SEARCH_RESULT} element={<SearchResultPage />}/>
              <Route path={PageRoutes.LOGIN} element={<LoginPage />}/>
              <Route path={PageRoutes.REGISTER} element={<RegisterPage />}/>
          </Routes>
      </>
  );
}

export default App;
