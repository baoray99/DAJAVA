import axios from "axios";

const getProductByCategory = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://beverage-app.herokuapp.com/product/category=${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default { getProductByCategory };
