import axios from "axios";

const postOrder = (datas, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://beverage-app.herokuapp.com/order", datas, {
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
const getOrderByUserId = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://beverage-app.herokuapp.com/order/user=${id}`, {
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
export default { postOrder, getOrderByUserId };
