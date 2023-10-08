import React, { useEffect, useState } from "react";

const EditMovieModal = (props) => {
  const [name, setName] = useState(props.movie.name);
  const [releaseDate, setReleaseDate] = useState(props.movie.releaseDate);
  const [description, setDescription] = useState(props.movie.description);
  const [theatreName, setTheatreName] = useState(props.movie.theatreName);
  const [ticketBooked, setTicketBooked] = useState(props.movie.ticketBooked);
  const [totalTicket, setTotalTicket] = useState(props.movie.totalTicket);
  const [price, setPrice] = useState(props.movie.price);
  const [displayUrl, setDisplayUrl] = useState(props.movie.displayUrl); // Add displayUrl state
  const [errors, setErrors] = useState({}); // Add errors state to track validation errors

  useEffect(() => {
    setName(props.movie.name);
    setReleaseDate(props.movie.releaseDate);
    setDescription(props.movie.description);
    setTheatreName(props.movie.theatreName);
    setTicketBooked(props.movie.ticketBooked);
    setTotalTicket(props.movie.totalTicket);
    setPrice(props.movie.price);
    setDisplayUrl(props.movie.displayUrl); // Update displayUrl state
  }, [props.movie]);

  // Validation function
  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!releaseDate) {
      errors.releaseDate = "Release Date is required";
    }

    if (!description.trim()) {
      errors.description = "Description is required";
    }

    if (!theatreName.trim()) {
      errors.theatreName = "Theatre Name is required";
    }

    if (!ticketBooked) {
      errors.ticketBooked = "Tickets Booked is required";
    }

    if (!totalTicket) {
      errors.totalTicket = "Total Tickets is required";
    }

    if (!price) {
      errors.price = "Price is required";
    }

    if (!displayUrl.trim()) {
      errors.displayUrl = "Display URL is required";
    }

    setErrors(errors);

    // Check if there are any validation errors
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = () => {
    // Validate the form before updating
    if (validateForm()) {
      // Gather updated movie details
      const updatedMovie = {
        id: props.movie.id,
        name,
        releaseDate,
        description,
        theatreName,
        ticketBooked,
        totalTicket,
        price,
        displayUrl, // Include displayUrl in the updated movie object
      };
      console.log(updatedMovie);

      // Call a function to update the movie with the new details (e.g., an API request)
      // props.onUpdate(updatedMovie);

      // Close the modal
      props.hideModal();
    }
  };

  return (
    <div>
      <div className="modal fade" ref={props.refEditMovie}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Movie
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={props.hideModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="releaseDate">Release Date</label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.releaseDate ? "is-invalid" : ""
                  }`}
                  id="releaseDate"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
                {errors.releaseDate && (
                  <div className="invalid-feedback">{errors.releaseDate}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="theatreName">Theatre Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.theatreName ? "is-invalid" : ""
                  }`}
                  id="theatreName"
                  value={theatreName}
                  onChange={(e) => setTheatreName(e.target.value)}
                />
                {errors.theatreName && (
                  <div className="invalid-feedback">{errors.theatreName}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="ticketBooked">Tickets Booked</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.ticketBooked ? "is-invalid" : ""
                  }`}
                  id="ticketBooked"
                  value={ticketBooked}
                  onChange={(e) => setTicketBooked(e.target.value)}
                />
                {errors.ticketBooked && (
                  <div className="invalid-feedback">{errors.ticketBooked}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="totalTicket">Total Tickets</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.totalTicket ? "is-invalid" : ""
                  }`}
                  id="totalTicket"
                  value={totalTicket}
                  onChange={(e) => setTotalTicket(e.target.value)}
                />
                {errors.totalTicket && (
                  <div className="invalid-feedback">{errors.totalTicket}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="displayUrl">Display URL</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.displayUrl ? "is-invalid" : ""
                  }`}
                  id="displayUrl"
                  value={displayUrl}
                  onChange={(e) => setDisplayUrl(e.target.value)}
                />
                {errors.displayUrl && (
                  <div className="invalid-feedback">{errors.displayUrl}</div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={props.hideModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovieModal;
