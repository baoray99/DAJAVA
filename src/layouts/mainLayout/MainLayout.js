import React, { useEffect, useState } from "react";
import "./MainLayout.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Layout, Menu, Carousel, Input } from "antd";
import { CoffeeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Milktea from "../../pages/milktea/Milktea";
import FruitJuice from "../../pages/fruitjuice/FruitJuice";

export default function MainLayout() {
  const { SubMenu } = Menu;
  const { Header, Content, Footer, Sider } = Layout;
  const location = useLocation();
  const path = location.pathname;
  const { Search } = Input;
  const contentStyle = {
    height: 380,
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const [selectedKey, setSelectedKey] = useState(
    path === "/milktea" ? 1 : path === "/fruitjuice" ? 2 : 99
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
  }, []);
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
            <Link to="/cart" target="_top">
              <ShoppingCartOutlined style={{ fontSize: 26, color: "white" }} />
            </Link>
          </Header>
          <Content style={{ width: "100%", marginTop: 64 }}>
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
                    path="/drink/milktea"
                    component={Milktea}
                  ></Route>
                  <Route
                    exact
                    path="/drink/fruitjuice"
                    component={FruitJuice}
                  ></Route>
                </Content>
                <Sider
                  className="site-layout-background"
                  id="mySider"
                  style={{ height: "100%" }}
                >
                  <Menu
                    mode="inline"
                    style={{ height: "100%" }}
                    defaultSelectedKeys={[selectedKey + ""]}
                    onClick={changeKey}
                  >
                    <Menu.Item key="1">
                      <Link to="/drink/milktea">Milktea</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Link to="/drink/fruitjuice">Fruit Juice</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link>Cafe</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title="Size">
                      <Menu.Item key="4">S</Menu.Item>
                      <Menu.Item key="5">M</Menu.Item>
                      <Menu.Item key="6">L</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title="Topping">
                      <Menu.Item key="7">Trân châu đen </Menu.Item>
                      <Menu.Item key="8">Thạch</Menu.Item>
                      <Menu.Item key="9">Trân châu trắng</Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
              </Layout>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}
