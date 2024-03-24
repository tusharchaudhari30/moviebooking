//http://localhost:8080
const baseUrl = "/api/v1.0/moviebooking";
const loginUser = async (email, password) => {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    baseUrl + `/login?loginId=${email}&password=${password}`,
    requestOptions
  );
};
const verifyLogin = async () => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(baseUrl + "/verify", requestOptions);
};
const getAllMovie = async () => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(baseUrl + "/all", requestOptions).then((response) =>
    response.json()
  );
};
const getMovieById = async (id) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(baseUrl + "/movie/" + id, requestOptions).then((response) =>
    response.json()
  );
};
const bookTicketById = async (movieId, ticketCount, bookingDate) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
  let raw = JSON.stringify({
    numberOfTickets: ticketCount,
    bookingDate: bookingDate,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return fetch(baseUrl + `/movie/${movieId}/add`, requestOptions).then(
    (response) => response.json()
  );
};
const getListOfTicket = async () => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(baseUrl + "/user/booking", requestOptions).then((response) =>
    response.json()
  );
};
const getMovieListBySearch = async (search) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return fetch(baseUrl + "/movies/search/" + search, requestOptions).then(
    (response) => response.json()
  );
};
const signUpUser = async (user) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    loginId: user.email,
    password: user.password,
    contactNumber: user.contactNumber,
    type: "User",
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(baseUrl + "/register", requestOptions).then((response) =>
    response.json()
  );
};
const saveMovie = async (movie) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  let raw = JSON.stringify(movie);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(baseUrl + "/movie", requestOptions).then((response) =>
    response.json()
  );
};

export {
  loginUser,
  verifyLogin,
  getAllMovie,
  getMovieById,
  bookTicketById,
  getListOfTicket,
  getMovieListBySearch,
  signUpUser,
  saveMovie,
};
