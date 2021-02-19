import React, { useEffect, useState } from "react";
import "./MainLayout.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Layout,
  Menu,
  Carousel,
  Input,
  Badge,
  Dropdown,
  message,
  Modal,
  Button,
  Form,
} from "antd";
import {
  CoffeeOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import Product from "../../pages/product/Product";
import CategoryAPI from "../../api/CategoryAPI";
import OrderAPI from "../../api/OrderAPI";
import Auth from "../../api/Auth";

export default function MainLayout() {
  const { Header, Content, Footer, Sider } = Layout;
  const { Search } = Input;
  let location = useLocation();
  let path = location.pathname;
  const [categories, setCategories] = useState(null);
  const [details, setDetails] = useState([]);
  const [count, setCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [user, setUser] = useState(null);
  const recieveData = (orders) => {
    setDetails(orders);
    setCount(orders.length);
  };
  const deleteItem = (index) => {
    details.splice(index, 1);
    setCount(details.length);
  };
  const delivery = () => {
    if (localStorage.getItem("token")) {
      showModal();
    } else {
      error();
    }
    localStorage.setItem("details", JSON.stringify(details));
  };
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const listlogOut = (
    <Menu>
      <Menu.Item>
        <Link to="/cart" target="_top">
          <OrderedListOutlined style={{ fontSize: 24 }} /> Your Delivery
        </Link>
      </Menu.Item>
      <Menu.Item danger onClick={logout}>
        Log out
      </Menu.Item>
    </Menu>
  );
  const listOrder = (
    <Menu>
      {count > 0 ? (
        details.map((detail, index) => {
          return (
            <Menu.Item
              style={{
                display: "flex",

                width: 460,
              }}
            >
              <img
                src={detail.detail.detail.image}
                height="100px"
                width="100px"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 24,
                  overflow: "hidden",
                }}
              >
                <p>{detail.detail.detail.name}</p>
                <p>Amount: {detail.order.quantity}</p>
                <p>Total: {detail.detail.totalCost}$</p>
              </div>

              <Button
                style={{ marginLeft: "auto" }}
                onClick={() => deleteItem(index)}
              >
                Delete item{" "}
              </Button>
            </Menu.Item>
          );
        })
      ) : (
        <Menu.Item>No Item </Menu.Item>
      )}
      {count > 0 ? (
        <Menu.Item>
          <Button type="primary" onClick={delivery}>
            Delivery now
          </Button>
        </Menu.Item>
      ) : (
        ""
      )}
    </Menu>
  );
  const error = () => {
    message.error("You must login to delivery!");
  };
  const success = () => {
    message.success("Your order is being delivered!");
  };
  const contentStyle = {
    height: 380,
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const [loading, setLoading] = useState(false);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinish = (values) => {
    setLoading(true);
    Auth.login(values.email, values.password)
      .then((res) => {
        localStorage.setItem("username", JSON.stringify(res.data.username));
        localStorage.setItem("id", JSON.stringify(res.data.id));
        setLoading(false);
        setModalLogin(false);
        window.location.reload();
      })
      .catch((error) => {
        onFinishFailed();
      });
  };
  const onFinishDelivery = (values) => {
    setLoading(true);
    const tempDetails = [];
    details.map((detail) => {
      tempDetails.push(detail.order);
    });
    const datas = {
      recipientName: values.recipientName,
      orderAddress: values.orderAddress,
      phone: values.phone,
      user: {
        id: user.id,
      },
      details: tempDetails,
    };
    OrderAPI.postOrder(datas, JSON.parse(localStorage.getItem("token")))
      .then((res) => {
        setLoading(false);
        setIsModalVisible(false);
        success();
        setCount(0);
      })
      .catch((error1) => {
        error();
        onFinishFailed();
      });
  };
  const onFinishFailed = (errorInfo) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModalLogin = () => {
    setModalLogin(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setModalLogin(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalLogin(false);
  };
  const [selectedKey, setSelectedKey] = useState(
    path === "/product/category=1"
      ? 1
      : path === "/product/category=2"
      ? 2
      : path === "/product/category=3"
      ? 3
      : path === "/product/category=4"
      ? 4
      : path === "/product/category=5"
      ? 5
      : path === "/product/category=6"
      ? 6
      : path === "/product/category=7"
      ? 7
      : path === "/product/category=8"
      ? 8
      : path === "/product/category=9"
      ? 9
      : path === "/product/category=10"
      ? 10
      : 99
  );

  const changeKey = (e) => {
    setSelectedKey(e.key);
  };
  const scrollCallBack = () => {
    const sider = document.getElementById("mySider");
    const content = document.getElementById("myContent");
    const sticky = 476;
    if (window.pageYOffset > sticky) {
      sider.classList.add("sticky");
      content.classList.add("content");
    } else {
      sider.classList.remove("sticky");
      content.classList.remove("content");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollCallBack);
    CategoryAPI.getCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {});
    Auth.getUserByUsername(
      JSON.parse(localStorage.getItem("token")),
      JSON.parse(localStorage.getItem("username"))
    )
      .then((res) => {})
      .catch((err) => {
        setUser(err.response.data);
      });
  }, [user]);
  return (
    <div>
      <Router>
        <Layout>
          <Header className="header">
            <CoffeeOutlined style={{ fontSize: 26, color: "white" }} />
            <Search
              placeholder="input search text"
              enterButton
              allowClear
              style={{ width: 400 }}
            />
            <div
              style={{
                width: localStorage.getItem("username") ? "15%" : "10%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Dropdown overlay={listOrder} trigger={["click"]}>
                <Badge count={count} showZero={true}>
                  <ShoppingCartOutlined
                    style={{ fontSize: 26, color: "white" }}
                  />
                </Badge>
              </Dropdown>

              {localStorage.getItem("username") !== null ? (
                <Dropdown overlay={listlogOut} trigger={["hover"]}>
                  <p style={{ color: "white" }}>Hi {user && user.fullname}</p>
                </Dropdown>
              ) : (
                <Button onClick={showModalLogin}>Login</Button>
              )}
            </div>
          </Header>
          <Content style={{ width: "100%" }}>
            <Carousel autoplay>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </Content>
          <Content style={{ padding: "0 50px", minHeight: "100vh" }}>
            <Switch>
              <Layout
                className="site-layout-background"
                style={{ padding: "24px 0" }}
              >
                <Content
                  style={{ padding: "0 24px", minHeight: 280 }}
                  id="myContent"
                >
                  <Route
                    exact
                    path="/product/category=:id"
                    // component={Product}
                    render={(props) => (
                      <Product {...props} parentCallback={recieveData} />
                    )}
                  >
                    {/* <Product parentCallback={recieveData} /> */}
                  </Route>
                </Content>
                <Sider
                  className="site-layout-background"
                  id="mySider"
                  style={{
                    height: "100%",
                  }}
                >
                  <Menu
                    mode="inline"
                    style={{ height: "100%" }}
                    selectedKeys={[selectedKey + ""]}
                    // onClick={changeKey}
                    // onChange={changeKey}
                  >
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <Menu.Item key={index + 1} onClick={changeKey}>
                            <Link to={`/product/category=${index + 1}`}>
                              {category.name}
                            </Link>
                          </Menu.Item>
                        );
                      })}
                  </Menu>
                </Sider>
              </Layout>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>Powered by BaoRay</Footer>
        </Layout>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            {...layout}
            name="basic"
            onFinish={onFinishDelivery}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Recipient Name"
              name="recipientName"
              rules={[
                { required: true, message: "Please input recipient name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="orderAddress"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                {loading ? "Delivering..." : "Delivery now"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Basic Modal"
          visible={modalLogin}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
          style={{ display: "flex" }}
        >
          <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                {loading ? "Logging in ..." : "Log in"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Router>
    </div>
  );
}
