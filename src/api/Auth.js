import axios from "axios";

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://beverage-app.herokuapp.com/login", {
        username: email,
        password: password,
      })
      .then((res) => {
        resolve(res);
        localStorage.setItem(
          "token",
          JSON.stringify(res.headers.authorization)
        );
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const getUserByUsername = (token, username) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://beverage-app.herokuapp.com/user/username=${username}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const register = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://beverage-app.herokuapp.com/user/register", {
        fullname: data.fullname,
        username: data.username,
        password: data.password,
        phone: data.phone,
        address: data.address,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default { login, getUserByUsername, register };
