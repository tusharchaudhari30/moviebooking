import React, { useState } from "react";
import { signUpUser } from "../restclient/MovieBookingClient";
import { toast } from "react-toastify";

const SignupModal = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [errors, setErrors] = useState({});

  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const signup = () => {
    const newErrors = {};

    if (firstName.trim() === "") {
      newErrors.firstName = "Please Enter First Name!";
    }

    if (lastName.trim() === "") {
      newErrors.lastName = "Please Enter Last Name!";
    }

    if (email.trim() === "") {
      newErrors.email = "Please Enter Email!";
    } else if (!email.match(emailRegex)) {
      newErrors.email = "Please Enter a Valid Email Address!";
    }

    if (password.trim() === "") {
      newErrors.password = "Please Enter Password!";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password and Confirm Password do not match!";
    }

    if (contactNumber.trim() === "") {
      newErrors.contactNumber = "Please Enter Contact Number!";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const userDetails = {
        firstName,
        lastName,
        email,
        password,
        contactNumber,
      };
      signUpUser(userDetails).then((body) => {
        if (body.statuscode === "UNAUTHORIZED") {
          toast.error(body.message);
        } else {
          toast.success(body.message);
        }
      });
      props.hideModal();
    }
  };

  return (
    <div>
      <div className="modal fade" ref={props.refSignup}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Sign Up
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={props.hideModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  id="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  id="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="emailSignup"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.contactNumber ? "is-invalid" : ""
                  }`}
                  id="contactNumber"
                  placeholder="Enter your contact number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
                {errors.contactNumber && (
                  <div className="invalid-feedback">{errors.contactNumber}</div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={signup}
              >
                Sign Up
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

export default SignupModal;
