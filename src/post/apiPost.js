export const create = (userId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: post
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const list = page => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/posts?page=${page}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const singlePost = postId => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/${postId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const listByUser = (postId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/by/${postId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const update = (postId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/${postId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: post
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const remove = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const like = (userId, token, postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/like`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const unlike = (userId, token, postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/unlike`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const comment = (userId, token, postId, comment) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/post/comment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId, comment })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const uncomment = (userId, token, postId, comment) => {
  return fetch(`${process.env.REACT_APP_API_URL}/apipost/uncomment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId, comment })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
