import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as bootstrap from "bootstrap";
import TicketCountModal from "./TicketCountModal";
import { getMovieById } from "../restclient/MovieBookingClient";

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

const MovieDescriptionPage = (props) => {
  const [movie, setMovie] = useState([]);
  let { movieid } = useParams();
  const ticketModelRef = useRef();

  useEffect(() => {
    getMovieById(movieid).then((body) => setMovie(body));
  }, [movieid]);

  // Determine the status based on the available tickets
  const getStatus = () => {
    if (movie.ticketBooked >= movie.totalTicket) {
      return (
        <span className="text-danger">Sold Out</span> // Red color for "Sold Out"
      );
    } else {
      return (
        <span className="text-success">Hurry, book now</span> // Green color for "Hurry, book now"
      );
    }
  };

  return (
    <React.Fragment>
      <TicketCountModal
        refTicketCount={ticketModelRef}
        hideModal={() => hideModal(ticketModelRef)}
        movieTicket={movie}
      />
      <div className="container card p-3 mt-5">
        <h1>{movie.name}</h1>
        <div className="row">
          <div className="col-md-3">
            <img
              src={movie.displayUrl}
              className="img-fluid"
              alt={movie.name}
            />
          </div>
          <div className="col-md-6">
            <h5>Description:</h5>
            <p>{movie.description}</p>
            <p>
              <strong>Release Date:</strong>{" "}
              {new Date(movie.releaseDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Theatre:</strong> {movie.theatreName}
            </p>
            <p>
              <strong>Price :</strong> {movie.price} $
            </p>
            <p>{getStatus()}</p>
            {movie.ticketBooked < movie.totalTicket && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (props.userAuthenticated === "") {
                    props.showLogin();
                  } else {
                    showModal(ticketModelRef);
                  }
                }}
              >
                Book Tickets
              </button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MovieDescriptionPage;
