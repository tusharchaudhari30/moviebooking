import React, { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import EditMovieModal from "./EditMovieModal";

const emptyMovie = {
  id: "",
  name: "",
  releaseDate: "",
  displayUrl: "",
  description: "",
  theatreName: "",
  ticketBooked: 0,
  totalTicket: 0,
  price: 0,
};
const showModal = (ref) => {
  const modalEle = ref.current;
  const bsModal = new bootstrap.Modal(modalEle, {
    backdrop: "static",
    keyboard: false,
  });
  bsModal.show();
};

const hideModal = (ref) => {
  const modalEle = ref.current;
  const bsModal = bootstrap.Modal.getInstance(modalEle);
  bsModal.hide();
};

const AdminPage = () => {
  const editMovieRef = useRef();
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(emptyMovie);

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
        price: 15,
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
        price: 15,
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
        price: 15,
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
        price: 15,
      },
      // Add more movies if needed
    ];

    setMovies(mockMovies);
  }, [selectedMovie]);

  return (
    <div className="container">
      <EditMovieModal
        refEditMovie={editMovieRef}
        movie={selectedMovie}
        hideModal={() => hideModal(editMovieRef)}
      />
      <h1>Admin Page - Movie List</h1>
      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setSelectedMovie(emptyMovie);
          showModal(editMovieRef);
        }}
      >
        Add Movie
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Release Date</th>
            <th>Description</th>
            <th>Theatre</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <img
                  src={movie.displayUrl}
                  alt={movie.name}
                  style={{ maxWidth: "100px" }} // Set a max width for images
                />
              </td>
              <td>{movie.name}</td>
              <td>{movie.releaseDate}</td>
              <td>{movie.description}</td>
              <td>{movie.theatreName}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedMovie(movie);
                    console.log(movie);
                    showModal(editMovieRef);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
