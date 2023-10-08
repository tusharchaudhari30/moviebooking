import React, { useState } from "react";

const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const login = () => {
    const errors = {};

    if (email.trim() === "") {
      errors.email = "Please Enter an Email Address!";
    } else if (!email.match(emailRegex)) {
      errors.email = "Please Enter a Valid Email Address!";
    }

    if (password.trim() === "") {
      errors.password = "Please Enter Password!";
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      // Display error messages
    } else {
      // Perform login logic here
      // If validation is successful, you can close the modal
      props.hideModal();
    }
  };

  const signup = () => {
    props.openSignup();
  };

  return (
    <div>
      <div className="modal fade" ref={props.refLogin}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={props.hideModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="emailLogin"
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
                  id="passwordLogin"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
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
                className="btn btn-outline-primary"
                onClick={login}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
