// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";

// function MovieDetails() {
//   const { id } = useParams();
//   const [movieDetails, setMovieDetails] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [movieGenres, setMovieGenres] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [movieResponse, genreResponse] = await Promise.all([
//           fetch(
//             `https://api.themoviedb.org/3/movie/${id}?api_key=366a83d4f0bbf0cd9f9e8cd7d31fb8e6`
//           ),
//           fetch(
//             "https://api.themoviedb.org/3/genre/movie/list?api_key=366a83d4f0bbf0cd9f9e8cd7d31fb8e6"
//           ),
//         ]);

//         if (!movieResponse.ok || !genreResponse.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const [movieData, genreData] = await Promise.all([
//           movieResponse.json(),
//           genreResponse.json(),
//         ]);

//         setMovieDetails(movieData);

//         // Filter genres to include only those associated with the movie
//         const movieGenreIds = movieData?.genres?.map((genre) => genre.id) || [];
//         const filteredGenres = genreData.genres.filter((genre) =>
//           movieGenreIds.includes(genre.id)
//         );

//         setMovieGenres(filteredGenres);
//       } catch (error) {
//         console.error(error);
//         setError("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const formatReleaseDate = (dateString) => {
//     // Create a new Date object from the input date string
//     const date = new Date(dateString);

//     // Define arrays for month names and AM/PM
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     const amPm = date.getHours() < 12 ? "AM" : "PM";

//     // Get components of the date
//     const monthName = months[date.getMonth()];
//     const day = date.getDate();
//     const year = date.getFullYear();
//     const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
//     const minutes = date.getMinutes().toString().padStart(2, "0");

//     // Construct the formatted date string
//     const formattedDate = `${monthName} ${day}, ${year} at ${hour}:${minutes} ${amPm}`;

//     return formattedDate;
//   };

//   // Use formatReleaseDate to format the movie's release date
//   const formattedReleaseDate = formatReleaseDate(movieDetails?.release_date);

//   return (
//     <div className="container">
//       <div className="details">
//         <aside className="fixed">
//           <div className="logo2">
//             <img src="/assets/logo.png" alt="MovieBox_logo" />
//             <p>MovieBox</p>
//           </div>
//           <ul>
//             <li>
//               <Link to="/">
//                 <img src="/assets/home.svg" alt="" />
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link className="current">
//                 <img src="/assets/Movie Projector.svg" alt="" /> Movies
//               </Link>
//             </li>
//             <li>
//               <Link>
//                 <img src="/assets/tvshow.svg" alt="" /> TV Series
//               </Link>
//             </li>
//             <li>
//               <Link>
//                 <img src="/assets/calendar.svg" alt="" /> Upcoming
//               </Link>
//             </li>
//           </ul>
//           <div className="play">
//             <p className="quiz">Play movie quizes and earn free tickets</p>
//             <p className="players">50k people are playing now</p>
//             <button className="start_playing">Start playing</button>
//           </div>

//           <div className="logout">
//             <img src="/assets/logout.svg" alt="" />
//             <p>Logout</p>
//           </div>
//         </aside>
//         {loading && <div className="loading"></div>}
//         {error && <div>Error: {error}</div>}
//         {!loading && !error && (
//           <div className="main-details">
//             <div className="trailer">
//               <img
//                 src={`https://image.tmdb.org/t/p/w500/${movieDetails?.backdrop_path}`}
//                 alt=""
//               />
//               <img className="play-trailer" src="/assets/video.svg" alt="" />
//             </div>
//             <div className="detail_box">
//               <div className="details-info">
//                 <div className="movie-info">
//                   <p data-testid="movie-title">{movieDetails?.title}&nbsp;•</p>
//                   <p data-testid="movie-release-date">
//                     {formattedReleaseDate} &nbsp;•
//                   </p>
//                   <p className="rated">PG-13&nbsp;•</p>
//                   <p data-testid="movie-runtime">
//                     {movieDetails?.runtime} mins
//                   </p>
//                   {movieGenres.map((genre) => (
//                     <a className="genre" href="##" key={genre.id}>
//                       {genre.name}
//                     </a>
//                   ))}
//                 </div>
//                 <p data-testid="overview" className="overview">
//                   {movieDetails?.overview}
//                 </p>
//                 <div className="cast_crew">
//                   <p className="directors">
//                     Director: <span>Joseph Kosinki</span>
//                   </p>
//                   <p className="writers">
//                     Writers: <span>Jim Cash, Jack Epps Jr, Peter Craig</span>
//                   </p>
//                   <p className="stars">
//                     Star:{" "}
//                     <span>Tom Cruise, Jennifer Conelly, Miles Teller</span>
//                   </p>
//                 </div>
//                 <div className="rating_award">
//                   <p>
//                     <span>Top rated movie #65</span>
//                     Awards 9 nominations
//                   </p>
//                   <img src="/assets/Expand Arrow.png" alt="" />
//                 </div>
//               </div>
//               <div className="showtimes">
//                 <div className="interactions">
//                   <img src="/assets/Star.svg" alt="" />
//                   <p>
//                     <span>8.5</span> | 350k
//                   </p>
//                 </div>
//                 <button className="show_time">
//                   <img src="/assets/tickets.png" alt="" />
//                   See Showtimes
//                 </button>
//                 <button className="more-watch">
//                   <img src="/assets/list.svg" alt="" />
//                   More watch options
//                 </button>
//                 <div className="other-movies">
//                   <p>
//                     <img src="/assets/list.png" alt="" />
//                     The Best Movies and Shows in September
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MovieDetails;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieGenres, setMovieGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieResponse, genreResponse, creditsResponse] =
          await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=366a83d4f0bbf0cd9f9e8cd7d31fb8e6`
            ),
            fetch(
              "https://api.themoviedb.org/3/genre/movie/list?api_key=366a83d4f0bbf0cd9f9e8cd7d31fb8e6"
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/credits?api_key=366a83d4f0bbf0cd9f9e8cd7d31fb8e6`
            ),
          ]);

        if (!movieResponse.ok || !genreResponse.ok || !creditsResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [movieData, genreData, creditsData] = await Promise.all([
          movieResponse.json(),
          genreResponse.json(),
          creditsResponse.json(),
        ]);

        setMovieDetails(movieData);

        // Filter genres to include only those associated with the movie
        const movieGenreIds = movieData?.genres?.map((genre) => genre.id) || [];
        const filteredGenres = genreData.genres.filter((genre) =>
          movieGenreIds.includes(genre.id)
        );

        setMovieGenres(filteredGenres);

        // Extract director(s), writer(s), and star(s) from credits data
        const directors = creditsData.crew.filter(
          (crewMember) => crewMember.job === "Director"
        );
        const writers = creditsData.crew.filter(
          (crewMember) => crewMember.department === "Writing"
        );
        const stars = creditsData.cast.slice(0, 3);

        setDirectors(directors);
        setWriters(writers);
        setStars(stars);
      } catch (error) {
        console.error(error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatReleaseDate = (dateString) => {
    // Create a new Date object from the input date string
    const date = new Date(dateString);

    // Define arrays for month names and AM/PM
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const amPm = date.getHours() < 12 ? "AM" : "PM";

    // Get components of the date
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Construct the formatted date string
    const formattedDate = `${monthName} ${day}, ${year} at ${hour}:${minutes} ${amPm}`;

    return formattedDate;
  };

  // Use formatReleaseDate to format the movie's release date
  const formattedReleaseDate = formatReleaseDate(movieDetails?.release_date);

  return (
    <div className="container">
      <div className="details">
        <aside className="fixed">
          <div className="logo2">
            <img src="/assets/logo.png" alt="MovieBox_logo" />
            <p>MovieBox</p>
          </div>
          <ul>
            <li>
              <Link to="/">
                <img src="/assets/home.svg" alt="" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link className="current">
                <img src="/assets/Movie Projector.svg" alt="" />{" "}
                <span>Movies</span>
              </Link>
            </li>
            <li>
              <Link>
                <img src="/assets/tvshow.svg" alt="" /> <span>TV Series</span>
              </Link>
            </li>
            <li>
              <Link>
                <img src="/assets/calendar.svg" alt="" /> <span>Upcoming</span>
              </Link>
            </li>
          </ul>
          <div className="play">
            <p className="quiz">Play movie quizes and earn free tickets</p>
            <p className="players">50k people are playing now</p>
            <button className="start_playing">Start playing</button>
          </div>

          <div className="logout">
            <img src="/assets/logout.svg" alt="" />
            <p>Logout</p>
          </div>
        </aside>
        {loading && <div className="loading"></div>}
        {error && (
          <p className="Error">
            <strong>Error:</strong> {error}. <strong>Reload!</strong>
          </p>
        )}
        {!loading && !error && (
          <div className="main-details">
            <div className="trailer">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails?.backdrop_path}`}
                alt=""
              />
              <img className="play-trailer" src="/assets/video.svg" alt="" />
            </div>
            <div className="detail_box">
              <div className="details-info">
                <div className="movie-info">
                  <p data-testid="movie-title">{movieDetails?.title}&nbsp;•</p>
                  <p data-testid="movie-release-date">
                    {formattedReleaseDate} &nbsp;•
                  </p>
                  <p className="rated">PG-13&nbsp;•</p>
                  <p data-testid="movie-runtime">
                    {movieDetails?.runtime} mins
                  </p>
                  {movieGenres.map((genre) => (
                    <a className="genre" href="##" key={genre.id}>
                      {genre.name}
                    </a>
                  ))}
                </div>
                <p data-testid="overview" className="overview">
                  {movieDetails?.overview}
                </p>
                <div className="cast_crew">
                  <p className="directors">
                    Director:{" "}
                    {directors.map((director, index) => (
                      <span key={director.credit_id}>
                        {director.name}
                        {index < directors.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <p className="writers">
                    Writers:{" "}
                    {writers.map((writer, index) => (
                      <span key={writer.credit_id}>
                        {writer.name}
                        {index < writers.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <p className="stars">
                    Star:{" "}
                    {stars.map((star, index) => (
                      <span key={star.credit_id}>
                        {star.name}
                        {index < stars.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="rating_award">
                  <p>
                    <span>Top rated movie #65</span>
                    Awards 9 nominations
                  </p>
                  <img src="/assets/Expand Arrow.png" alt="" />
                </div>
              </div>
              <div className="showtimes">
                <div className="interactions">
                  <img src="/assets/Star.svg" alt="" />
                  <p>
                    <span>8.5</span> | 350k
                  </p>
                </div>
                <button className="show_time">
                  <img src="/assets/tickets.png" alt="" />
                  See Showtimes
                </button>
                <button className="more-watch">
                  <img src="/assets/list.svg" alt="" />
                  More watch options
                </button>
                <div className="other-movies">
                  <p>
                    <img src="/assets/list.png" alt="" />
                    The Best Movies and Shows in September
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
