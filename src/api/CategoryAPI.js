import axios from "axios";

const getCategory = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://beverage-app.herokuapp.com/category")
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default { getCategory };
