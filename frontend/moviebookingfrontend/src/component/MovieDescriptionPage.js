import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as bootstrap from "bootstrap";
import TicketCountModal from "./TicketCountModal";

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
    console.log(movieid);
    const selectedMovie = {
      id: "",
      name: "Avatar",
      releaseDate: "2022-04-20",
      displayUrl:
        "https://resizing.flixster.com/f0bXqQUdQ0m6fyqZjI1OXSEia9E=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzEzYmY3ZmZiLWMzYjEtNDQxMy05NTAxLTc2YTRlNmE3NWY2MC5qcGc=",
      description:
        "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
      theatreName: "Galaxy Cinemas",
      ticketBooked: 75,
      totalTicket: 120,
      price: 15,
    };
    setMovie(selectedMovie);
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
        initialPrice={movie.price}
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
