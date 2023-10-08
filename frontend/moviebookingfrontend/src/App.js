import "./App.css";
import * as bootstrap from "bootstrap";
import React, { useRef, useState } from "react";
import MoviePage from "./component/Moviepage";
import MovieDescriptionPage from "./component/MovieDescriptionPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import LoginModal from "./component/LoginModal";
import SignupModal from "./component/SignupModal";
import BookingPage from "./component/BookingPage";
import AdminPage from "./component/AdminPage";

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
  const [userAuthenticated, setUserAuthenticated] = useState("User");
  const loginModalRef = useRef();
  const signupModalRef = useRef();

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
          <Route path="/movie/:movieid" element={<MovieDescriptionPage />} />
        </React.Fragment>
      );
    }
  };
  return (
    <div>
      <Navbar
        showModal={() => showModal(loginModalRef)}
        userAuthenticated={userAuthenticated}
        setUserAuthenticated={setUserAuthenticated}
      />

      <LoginModal
        refLogin={loginModalRef}
        openSignup={() => {
          hideModal(loginModalRef);
          showModal(signupModalRef);
        }}
        hideModal={() => hideModal(loginModalRef)}
      />
      <SignupModal
        refSignup={signupModalRef}
        hideModal={() => hideModal(signupModalRef)}
      />
      <BrowserRouter>
        <Routes>{loadRoutes()}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
