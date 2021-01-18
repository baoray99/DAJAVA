import React, { useState } from "react";
import { Drawer, Button, Modal } from "antd";
import "./ProductDetail.css";

export default function ProductDetail(props) {
  const onClose = props.onClose;
  const visible = props.visible;
  const selectedItem = props.selectedItem;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        width={1024}
      >
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "50%" }}>
            <img
              src={selectedItem && selectedItem.avatar}
              width="100%"
              alt="product_img"
            />
          </div>
          <div
            style={{
              width: "50%",
              paddingLeft: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <p
              className="product_name"
              style={{ fontSize: 32, fontWeight: 600 }}
            >
              {selectedItem && selectedItem.name}
            </p>
            <p>{selectedItem && selectedItem.price} Đ</p>
            <Button type="primary" onClick={showModal}>
              Buy Now
            </Button>
          </div>
        </div>
        <div>{selectedItem && selectedItem.description}</div>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Add to Cart"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Drawer>
    </div>
  );
}
