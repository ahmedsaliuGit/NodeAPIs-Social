export const signup = user => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const signin = user => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }

  next();
};

export const signout = next => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  return fetch(`${process.env.REACT_APP_API_URL}/api/signout`, {
    method: "GET"
  })
    .then(response => console.log(response.json))
    .catch(err => console.log(err));
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  }

  return false;
};

export const forgotPassword = email => {
  console.log("email: ", email);
  return fetch(`${process.env.REACT_APP_API_URL}/api/forgot-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })
    .then(response => {
      console.log("forgot password response: ", response);
      return response.json();
    })
    .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/reset-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(resetInfo)
  })
    .then(response => {
      console.log("forgot password response: ", response);
      return response.json();
    })
    .catch(err => console.log(err));
};

export const socialLogin = user => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/social-login/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    // credentials: "include", // works only in the same origin
    body: JSON.stringify(user)
  })
    .then(response => {
      console.log("signin response: ", response);
      return response.json();
    })
    .catch(err => console.log(err));
};
