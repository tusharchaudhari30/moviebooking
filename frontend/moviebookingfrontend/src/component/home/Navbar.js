import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const checkUserAuthenticated = (component) => {
    if (props.userAuthenticated === "Admin") {
      return (
        <React.Fragment>
          <form className="d-flex">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                props.setUserAuthenticated("");
              }}
            >
              Logout
            </button>
          </form>
        </React.Fragment>
      );
    } else if (props.userAuthenticated === "User") {
      return (
        <React.Fragment>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookings">
                  Bookings
                </Link>
              </li>
            </ul>
          </div>
          <form className="d-flex">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                props.setUserAuthenticated("");
              }}
            >
              Logout
            </button>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Movies
                </Link>
              </li>
            </ul>
          </div>
          <form className="d-flex">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={props.showModal}
            >
              Login
            </button>
          </form>
        </React.Fragment>
      );
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Movie Booking
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {checkUserAuthenticated()}
      </div>
    </nav>
  );
};

export default Navbar;
