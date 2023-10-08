const baseUrl = "http://localhost:8080/api/v1.0/moviebooking";
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

export { loginUser, verifyLogin };
