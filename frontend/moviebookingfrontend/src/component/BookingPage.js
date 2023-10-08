import React, { useEffect, useState } from "react";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);

  // Mock data for bookings (replace with actual API call)
  const mockBookings = [
    {
      id: 1,
      movieName: "Avatar",
      theatreName: "Galaxy Cinemas",
      bookingDate: "2022-09-15T14:30:00Z",
      numberOfTickets: 3,
      totalPrice: 45,
      movieImage:
        "https://resizing.flixster.com/f0bXqQUdQ0m6fyqZjI1OXSEia9E=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzEzYmY3ZmZiLWMzYjEtNDQxMy05NTAxLTc2YTRlNmE3NWY2MC5qcGc=",
    },
    {
      id: 2,
      movieName: "Inception",
      theatreName: "Royal Cinemas",
      bookingDate: "2022-09-18T18:15:00Z",
      numberOfTickets: 2,
      totalPrice: 30,
      movieImage:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    },
    // Add more mock bookings if needed
  ];

  useEffect(() => {
    // You can replace this with your actual API call to fetch user's bookings
    // For now, we'll use the mock data
    setBookings(mockBookings);
  }, []);

  return (
    <div className="container">
      <h1>Your Booking Orders</h1>
      <div className="row">
        {bookings.map((booking) => (
          <div key={booking.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={booking.movieImage}
                    className="img-fluid rounded-start"
                    alt={booking.movieName}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{booking.movieName}</h5>
                    <p className="card-text">Theatre: {booking.theatreName}</p>
                    <p className="card-text">
                      Booking Date:{" "}
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                      Number of Tickets: {booking.numberOfTickets}
                    </p>
                    <p className="card-text">
                      Total Price: ${booking.totalPrice}
                    </p>
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
