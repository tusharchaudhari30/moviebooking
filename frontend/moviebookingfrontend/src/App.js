import "./App.css";
import * as bootstrap from "bootstrap";
import React, { useEffect, useRef, useState } from "react";
import MoviePage from "./component/home/Moviepage";
import MovieDescriptionPage from "./component/moviebooking/MovieDescriptionPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/home/Navbar";
import LoginModal from "./component/home/LoginModal";
import SignupModal from "./component/home/SignupModal";
import BookingPage from "./component/moviebooking/BookingPage";
import AdminPage from "./component/admin/AdminPage";
import { verifyLogin } from "./component/restclient/MovieBookingClient";

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

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState("");
  const [token, setToken] = useState("");
  const loginModalRef = useRef();
  const signupModalRef = useRef();
  const updateUser = () => {
    verifyLogin()
      .then((res) => res.json())
      .then((body) => {
        if (body.statuscode === "UNAUTHORIZED") {
          setUserAuthenticated("");
        } else {
          setUserAuthenticated(body.type);
        }
      });
  };
  useEffect(() => {
    updateUser();
  }, [token]);
  const loadRoutes = () => {
    if (userAuthenticated === "Admin") {
      return (
        <React.Fragment>
          <Route path="/" element={<AdminPage />} />
        </React.Fragment>
      );
    } else if (userAuthenticated === "User") {
      return (
        <React.Fragment>
          <Route path="/" element={<MoviePage />} />
          <Route path="/movie/:movieid" element={<MovieDescriptionPage />} />
          <Route path="/bookings" element={<BookingPage />} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Route path="/" element={<MoviePage />} />
          <Route
            path="/movie/:movieid"
            element={
              <MovieDescriptionPage
                userAuthenticated={userAuthenticated}
                showLogin={() => showModal(loginModalRef)}
              />
            }
          />
        </React.Fragment>
      );
    }
  };
  return (
    <div>
      <LoginModal
        refLogin={loginModalRef}
        openSignup={() => {
          hideModal(loginModalRef);
          showModal(signupModalRef);
        }}
        hideModal={() => hideModal(loginModalRef)}
        setToken={setToken}
      />
      <SignupModal
        refSignup={signupModalRef}
        hideModal={() => hideModal(signupModalRef)}
      />
      <BrowserRouter>
        <Navbar
          showModal={() => showModal(loginModalRef)}
          userAuthenticated={userAuthenticated}
          setUserAuthenticated={setUserAuthenticated}
        />
        <Routes>{loadRoutes()}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
