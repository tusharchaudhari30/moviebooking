import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllMovie,
  getMovieListBySearch,
} from "../restclient/MovieBookingClient";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchName, setSearchName] = useState("");
  useEffect(() => {
    if (searchName === "") {
      getAllMovie().then((body) => setMovies(body));
    } else {
      getMovieListBySearch(searchName).then((body) => setMovies(body));
    }
  }, [searchName]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row p-3">
          <div className="col-md-8">
            <h1>Movies</h1>
          </div>
          <div className="col-md-4">
            <input
              className="form-control mr-sm-2 m-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchName}
              onChange={(event) => setSearchName(event.target.value)}
            />
          </div>
        </div>
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-3">
              <div className="card">
                <Link to={"/movie/" + movie.id}>
                  <img
                    src={movie.displayUrl}
                    className="card-img-top"
                    alt={movie.name} // Adjust image size as needed
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <Link
                    to={"/movie/" + movie.id}
                    className="btn btn-primary mt-auto"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MoviePage;
