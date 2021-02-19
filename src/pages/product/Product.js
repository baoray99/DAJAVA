import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import ProductAPI from "../../api/ProductByCategoryAPI";
import ProductDetail from "../../components/product_detail/ProductDetail";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import "./Product.css";

export default function Milktea(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const id = props.match.params.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orders] = useState([]);
  const recieveData = (childData) => {
    orders.push(childData);
    senDataToMainLayout(orders);
  };
  // callback
  const senDataToMainLayout = (orders) => {
    props.parentCallback(orders);
  };
  const showDrawer = (product) => {
    setVisible(true);
    setSelectedItem(product);
  };
  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    setLoading(true);
    ProductAPI.getProductByCategory(id)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [id]);
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
            data.map((product) => {
              return (
                <Card
                  style={{
                    width: 250,
                    margin: 20,
                    textAlign: "left",
                  }}
                  cover={<img alt="example" src={product.image} />}
                >
                  <div style={{ display: "flex" }}>
                    <Link
                      className="name_drink"
                      onClick={() => showDrawer(product)}
                      style={{ fontWeight: 700 }}
                    >
                      {product.name}
                    </Link>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p>{product.price} $</p>
                  </div>
                </Card>
              );
            })}
        </div>
        <ProductDetail
          visible={visible}
          onClose={onClose}
          selectedItem={selectedItem}
          parentCallback={recieveData}
        />
      </Spin>
    </div>
  );
}
