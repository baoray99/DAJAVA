import axios from "axios";

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://reqres.in/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        resolve(res);
        localStorage.setItem("token", JSON.stringify(res.data.token));
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default { login };
