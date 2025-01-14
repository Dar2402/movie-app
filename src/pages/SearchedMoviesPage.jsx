import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

// language=en-US&page=1 => query parameters
// localhost:5173/search?batman
// cart/2/ => body parameters is 2

/*

- useLocation is a React Router hook that returns the current location object.
- The location object contains information about the URL currently displayed in the browser, such as pathname, search, and hash.

- Current URL: https://example.com/search?query=react&page=2
-d =  {
  "pathname": "/search",
  "search": "?query=react&page=2",
  "hash": "",
  "state": null,
  "key": "abcd1234"
}
  d.hash

const searchedQuery = new URLSearchParams("?query=react&page=2");
searchedQuery.get('movie') // react
searchedQuery.get('page') // 2

*/

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchedMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery().get("query");

  useEffect(() => {
    const fetchMovie = async () => {
      if (query) {
        setLoading(true);
        try {
          const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
          );
          const data = await response.json();
          setMovies(data.results || []);
          console.log(data.results);
        } catch (err) {
          console.error("Failed to fetch", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMovie();
  }, [query]);

  return (
    <div className="searched-movies-page">
      <h2>Search Results for: {query}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchedMoviesPage;

/*

Error Boundary: These are special components that catch errors in any part of their child tree, can log these error or display a fallback UI, instead of crashung the whole tree.

function Child() {
}

function Parent(){
  <Child />
  <Child />
  <Child />
  <Child />
}

*/
