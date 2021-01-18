import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import MilkteaAPI from "../../api/Milktea";
import ProductDetail from "../../components/product_detail/ProductDetail";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import "./Milktea.css";

export default function Milktea(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const showDrawer = (milktea) => {
    setVisible(true);
    setSelectedItem(milktea);
  };
  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    setLoading(true);
    MilkteaAPI.getAllMilktea()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Spin indicator={antIcon} spinning={loading}>
        {" "}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
          className="site-drawer-render-in-current-wrapper"
        >
          {data &&
            data.map((milktea) => {
              return (
                <Card
                  style={{
                    width: 250,
                    margin: 20,
                  }}
                  cover={<img alt="example" src={milktea.avatar} />}
                >
                  <div style={{ display: "flex" }}>
                    <Link
                      className="name_drink"
                      onClick={() => showDrawer(milktea)}
                    >
                      {milktea.name}
                    </Link>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p>cailontao</p>
                  </div>
                </Card>
              );
            })}
        </div>
        <ProductDetail
          visible={visible}
          onClose={onClose}
          selectedItem={selectedItem}
        />
      </Spin>
    </div>
  );
}
