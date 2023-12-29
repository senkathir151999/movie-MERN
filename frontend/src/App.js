import logo from "./logo.svg";
import "./App.css";
import Movies from "./page/Movies";
import Movie from "./page/Movie";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";


function App() {
  return (
  
     <Router>
    <Routes>
      <Route path="/" exact element={<Movies />} />
      <Route path="/movie/:id"  element={<Movie />} />
      </Routes>
      </Router>
  );
}

export default App;
