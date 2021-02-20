import axios from "axios";

var baseURL = "";

const development = true;

// console.log(location.hostname);

if (
  location.hostname === "localhost" ||
  window.location === "http://127.0.0.1"
) {
  baseURL = "http://127.0.0.1:8000/";

  if (development) {
    baseURL = "http://127.0.0.1:8080/";
  }
} else {
  baseURL = "https://8e04c339d55d.ngrok.io/";
}

// Main Axios is used for sending requests to Django Server with Access Token

axios.defaults.baseURL = baseURL;

const AxiosApiInstance = axios.create({
  baseURL: baseURL,
  timeout: 50000,
});

AxiosApiInstance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
AxiosApiInstance.defaults.xsrfCookieName = "csrftoken";
AxiosApiInstance.defaults.withCredentials = true;

//Request Interceptors to add access Token for every request
AxiosApiInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      config.headers["Authorization"] = "Bearer " + access_token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Response Interceptors to handle all cases after request is made to backend

AxiosApiInstance.interceptors.response.use(
  // Implies Request was Successful so return the data
  (response) => {
    alert("Access Token was Valid !!! " + JSON.stringify(response));

    return response;
  },
  (error) => {
    // console.log(error.response);

    // Implies Request was Unauthorized so get new Access Token from Refresh Token
    if (
      (error.response.status === 403 || error.response.status === 401) &&
      error.response &&
      error.config
    ) {
      return axios
        .post("api/token/refresh/", {
          refresh: localStorage.getItem("refresh_token"),
        })
        .then((res) => {
          // Got a new access token and we update it and
          // perform the previous axios request
          // console.log(res.status);

          if (res.status === 201 || res.status === 200) {
            alert("Got new Access Token !!!");
            localStorage.setItem("access_token", res.data.access);
            error.config.headers["Authorization"] =
              "Bearer " + localStorage.getItem("access_token");
            return AxiosApiInstance.request(error.config);
          }
        })
        .catch((error) => {
          // Refresh Token was invalid/expired so we remove both tokens
          // and we refresh so user is directed to login component

          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          alert("You need to Login Again !!!");
          window.location.reload();
        });
    }
  }
);

const RegisterAxiosApiInstance = axios.create({
  baseURL: baseURL,
  timeout: 50000,
});

RegisterAxiosApiInstance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
RegisterAxiosApiInstance.defaults.xsrfCookieName = "csrftoken";
RegisterAxiosApiInstance.defaults.withCredentials = true;

RegisterAxiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const LoginAxiosApiInstance = axios.create({
  baseURL: baseURL,
  timeout: 50000,
});

LoginAxiosApiInstance.interceptors.response.use(
  (response) => {
    alert("Login Successful!");
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem("access_token", response.data.access);
    window.location.reload();
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  AxiosApiInstance,
  LoginAxiosApiInstance,
  RegisterAxiosApiInstance,
};
