import React, { useEffect, useState } from "react";
import { getListOfTicket } from "../restclient/MovieBookingClient";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getListOfTicket().then((body) => setBookings(body));
  }, []);

  return (
    <div className="container">
      {bookings.length === 0 ? (
        <h2>No Booking Found.</h2>
      ) : (
        <h1>Your Booking Orders</h1>
      )}
      <div className="row">
        {bookings.map((booking) => (
          <div key={booking.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={booking.displayUrl}
                    className="img-fluid rounded-start"
                    alt={booking.movieName}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{booking.movieName}</h5>
                    <p className="card-text">Theatre: {booking.theatreName}</p>
                    <p className="card-text">
                      Booking Date: {booking.bookingDate}
                    </p>
                    <p className="card-text">
                      Number of Tickets: {booking.numberOfTickets}
                    </p>
                    <p className="card-text">Total Price: ${booking.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
