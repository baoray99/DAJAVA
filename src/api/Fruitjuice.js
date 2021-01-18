import axios from "axios";

const getAllFruitjuice = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://5ff3f0f516cf4f0017c1f865.mockapi.io/fruitjuice")
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default { getAllFruitjuice };
