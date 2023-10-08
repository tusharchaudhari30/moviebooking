import React, { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import EditMovieModal from "./EditMovieModal";
import { getAllMovie } from "../restclient/MovieBookingClient";

const emptyMovie = {
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
    getAllMovie().then((body) => setMovies(body));
  }, [selectedMovie]);

  return (
    <div className="container">
      <EditMovieModal
        refEditMovie={editMovieRef}
        movie={selectedMovie}
        hideModal={() => hideModal(editMovieRef)}
        setMovies={setMovies}
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
