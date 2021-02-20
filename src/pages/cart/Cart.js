import React, { useState, useEffect } from "react";
import OrderAPI from "../../api/OrderAPI";
import Auth from "../../api/Auth";
import { Layout } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";

export default function Cart() {
  const { Header, Content } = Layout;
  // const [orders, setOrders] = useState(null);
  const [details, setDetails] = useState([]);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    OrderAPI.getOrderByUserId(
      JSON.parse(localStorage.getItem("token")),
      JSON.parse(localStorage.getItem("id"))
    )
      .then((res) => {
        const detailsRes = [];
        const resp = res.data;
        resp.forEach((order) => detailsRes.push(order.details));
        setDetails(detailsRes);
        setOrder(resp);
      })
      .catch((err) => {});
    Auth.getUserByUsername(
      JSON.parse(localStorage.getItem("token")),
      JSON.parse(localStorage.getItem("username"))
    )
      .then((res) => {})
      .catch((err) => {
        setUser(err.response.data);
      });
  }, []);
  return (
    <div>
      <Layout>
        <Header className="header">
          <a href="/product/category=1">
            <CoffeeOutlined style={{ fontSize: 26, color: "white" }} />
          </a>
          {/* <Search
            placeholder="input search text"
            enterButton
            allowClear
            style={{ width: 400 }}
          /> */}
          <div>
            {localStorage.getItem("username") !== null ? (
              <p style={{ color: "white" }}>Hi {user && user.fullname}</p>
            ) : (
              ""
            )}
          </div>
        </Header>
      </Layout>
      <Content>
        <h1>Your delivery</h1>
        {details &&
          details.map((detail, index) => {
            return [
              // muon return 2 cai tro len thi dung dau []
              <h3>Order {index + 1}</h3>,
              detail.map((a) => {
                // nhieu map thi pahi return nhieu lan
                return (
                  <div
                    style={{
                      maxWidth: 1024,
                      margin: "10px auto ",
                      display: "flex",
                    }}
                  >
                    <img src={a.product.image} height="120px" width="120px" />
                    <div>
                      <div style={{ display: "flex" }}>
                        <p style={{ margin: "0px 10px" }}>
                          Name: {a.product.name}
                        </p>
                        <p style={{ margin: "0px 10px" }}>
                          Quantity: {a.quantity}
                        </p>
                        <p style={{ margin: "0px 10px" }}>On the way ...</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <p style={{ margin: "0px 10px" }}>Note: {a.note}</p>
                      </div>
                    </div>
                  </div>
                );
              }),
            ];
          })}
      </Content>
    </div>
  );
}
