import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import FruitJuiceAPI from "../../api/Fruitjuice";
import { LoadingOutlined } from "@ant-design/icons";

export default function Milktea() {
  const { Meta } = Card;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    FruitJuiceAPI.getAllFruitjuice()
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
        >
          {data &&
            data.map((fruitjuice) => {
              return (
                <Card
                  style={{ width: 250, margin: 20 }}
                  cover={<img alt="example" src={fruitjuice.avatar} />}
                >
                  <Meta
                    title={fruitjuice.name}
                    description="This is the description"
                  />
                </Card>
              );
            })}
        </div>
      </Spin>
    </div>
  );
}
