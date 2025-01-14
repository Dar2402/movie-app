import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setMovies(data.results);
      console.log(data.results);
    };
    fetchMovies();
  }, []);

  if (error) {
    throw new Error("Simulated Error");
  }

  return (
    <div>
      <h2>Popular Movies</h2>
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

/*

Memoization: Memoization is an optimization technique that helps to improve performance by caching the results of expensive function calls and reusing the cached result when the same inputs occur again.

function Child({props}){
  displaying props
}

function Parent(){
  const [props, setProps] = useState(0);
  setProps(10);
  <Child props={props}/>
}

const Child = React.memo(function Child({props}){
  displaying props
})
*/
