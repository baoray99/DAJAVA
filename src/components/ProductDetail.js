import React from "react";
import { Drawer } from "antd";

export default function ProductDetail(props) {
  const onClose = props.onClose;
  const visible = props.visible;
  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        getContainer={false}
      >
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}
