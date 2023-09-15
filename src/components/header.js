import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = async (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=366a83d4f0bbf0cd9f9e8cd7d31fb8e6&query=${newSearchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Fetch top-rated movies data
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=366a83d4f0bbf0cd9f9e8cd7d31fb8e6"
        );
        const data = await response.json();
        setTopRatedMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch genre data
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=366a83d4f0bbf0cd9f9e8cd7d31fb8e6"
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopRatedMovies();
    fetchGenres();
  }, []);

  // Map genre IDs in top-rated movies data to their corresponding genres
  const topRatedMoviesWithGenres = topRatedMovies.map((movie) => {
    const movieGenres = movie.genre_ids.map((genreId) => {
      const genre = genres.find((g) => g.id === genreId);
      return genre ? genre.name : "Unknown";
    });

    return {
      ...movie,
      genres: movieGenres,
    };
  });

  const top10RatedMoviesWithGenres = topRatedMoviesWithGenres.slice(0, 10);

  return (
    <div className="container">
      <header>
        <div className="content">
          <nav>
            <div className="logo">
              <img src="/assets/logo.png" alt="MovieBox_logo" />
              <p className="logo_text">MovieBox</p>
            </div>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="What do you want to watch?"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <div className="menu">
              <p>Sign up</p>
              <img src="/assets/menu.svg" alt="menu" />
            </div>
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((movie) => (
                  <div key={movie.id} className="search-result">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt=""
                    />
                    <div className="title_date">
                      <p>{movie.title}</p>
                      <p>{movie.release_date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </nav>
          <div className="boxes">
            <div className="description-box">
              <h1>John Wick 3: Parabellum</h1>
              <div className="rating">
                <div className="imdb">
                  <img src="/assets/imdb.png" alt="imdb" />
                  <p>86.0 / 100</p>
                </div>
                <div className="tomatoes">
                  <img src="/assets/rottentomatoes.png" alt="rotten_tomatoes" />
                  <p>97%</p>
                </div>
              </div>
              <p className="description">
                John Wick is on the run after killing a member of the
                international assassins&#39; guild, and with a $14 million price
                tag on his head, he is the target of hit men and women
                everywhere.
              </p>
              <button className="watch">
                <img src="/assets/play.svg" alt="" />
                WATCH TRAILER
              </button>
            </div>
            <div className="box2">
              <div className="pagination-box">
                <div className="pagination">
                  <div className="text-wrapper">1</div>
                  <div className="div">2</div>
                  <div className="text-wrapper-2">3</div>
                  <div className="div">4</div>
                  <div className="div">5</div>
                </div>
                <div className="pointer" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="movies">
        <div className="title">
          <p>Featured Movie</p>
          <div className="more">
            <p>See more</p>
            <img src="/assets/chevron right.svg" alt="chevron_right" />
          </div>
        </div>
      </div>
      <div className="movie-list">
        {top10RatedMoviesWithGenres.map((movie) => (
          <div
            data-testid="movie-card"
            key={movie.id}
            {...movie}
            className="movie-card"
          >
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <img id="heart" src="/assets/heart.svg" alt="" />
              <img
                data-testid="movie-poster"
                className="poster"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />

              <p data-testid="movie-release-date" className="location-date">
                USA, {movie.release_date}
              </p>

              <p data-testid="movie-title" className="movie-title">
                {movie.title}
              </p>

              <div className="rating">
                <div className="imdb">
                  <img src="/assets/imdb.png" alt="imdb" />
                  <p>{movie.vote_average * 10} / 100</p>
                </div>
                <div className="tomatoes">
                  <img src="/assets/rottentomatoes.png" alt="rotten_tomatoes" />
                  <p>97%</p>
                </div>
              </div>

              <p className="genre">
                {movie.genres && Array.isArray(movie.genres)
                  ? movie.genres.join(", ")
                  : "Unknown"}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <footer>
        <div className="brands">
          <img src="/assets/facebook.svg" alt="faceboook" />
          <img src="/assets/instagram.svg" alt="instagram" />
          <img src="/assets/twitter.svg" alt="twitter" />
          <img src="/assets/youtube.svg" alt="youtube" />
        </div>
        <div className="links">
          <a href="index.html">Condition Of Use</a>
          <a href="index.html">Privacy & Policy</a>
          <a href="index.html">Press Room</a>
        </div>
        <p>© 2021 MovieBox by Adriana Eka Prayudha</p>
      </footer>
    </div>
  );
}
