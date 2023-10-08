import React, { useEffect, useState } from "react";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movie data from your API or database here
    // For demonstration purposes, we'll use mock data
    const mockMovies = [
      {
        id: "651ef9cf05e2dcd2eb8be896",
        name: "Avatar",
        releaseDate: "2022-04-20",
        displayUrl:
          "https://resizing.flixster.com/f0bXqQUdQ0m6fyqZjI1OXSEia9E=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzEzYmY3ZmZiLWMzYjEtNDQxMy05NTAxLTc2YTRlNmE3NWY2MC5qcGc=",
        description: "A sci-fi adventure.",
        theatreName: "Galaxy Cinemas",
        ticketBooked: 75,
        totalTicket: 120,
      },
      {
        id: "651ef9cf05e2dcd2eb8be896",
        name: "Inception",
        releaseDate: "2022-05-15",
        displayUrl:
          "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
        description: "A mind-bending thriller.",
        theatreName: "Royal Cinemas",
        ticketBooked: 75,
        totalTicket: 50,
      },
      {
        id: "651ef9cf05e2dcd2eb8be896",
        name: "Star Wars: The Rise of Skywalker",
        releaseDate: "2022-06-10",
        displayUrl:
          "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_.jpg",
        description: "An epic space opera.",
        theatreName: "Cineplex Cinemas",
        ticketBooked: 50,
        totalTicket: 100,
      },
      {
        id: "651ef9cf05e2dcd2eb8be896",
        name: "Night Manager Hindi",
        releaseDate: "2022-07-05",
        displayUrl:
          "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_FMjpg_UX1000_.jpg",
        description: "A Batman Movie",
        theatreName: "Silver Screens",
        ticketBooked: 30,
        totalTicket: 80,
      },
      // Add more movies if needed
    ];

    setMovies(mockMovies);
  }, []);

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
            />
          </div>
        </div>
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-3">
              <div className="card">
                <a href={"/movie/" + movie.id}>
                  <img
                    src={movie.displayUrl}
                    className="card-img-top"
                    alt={movie.name} // Adjust image size as needed
                  />
                </a>
                <div className="card-body d-flex flex-column">
                  <a
                    href={"/movie/" + movie.id}
                    className="btn btn-primary mt-auto"
                  >
                    Book
                  </a>
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
