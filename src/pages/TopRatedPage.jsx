import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

const TopRatedPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    };
    fetchTopRatedMovies();
  }, []);

  return (
    <div>
      <h2>Top Rated Movies</h2>
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedPage;
