import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import ScoreBoardAdmin from './components/ScoreBoardAdmin/ScoreBoardAdmin';
import Matches from './components/Matches/Matches';
import Manual from './components/Manual/Manual';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/manual" element={<Manual/>} />
          <Route path="/matches" element={<Matches/>} />
          <Route path="/scoreboards/:code" element={<ScoreBoard/>} />
          <Route path="/scoreboards/:code/admin" element={<ScoreBoardAdmin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
