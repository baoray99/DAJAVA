import React, { useState } from "react";
import {
  Drawer,
  Button,
  Modal,
  Select,
  InputNumber,
  Input,
  Checkbox,
  message,
} from "antd";
import "./ProductDetail.css";

export default function ProductDetail(props) {
  const onClose = props.onClose;
  const visible = props.visible;
  const selectedItem = props.selectedItem;
  const toppings = selectedItem && selectedItem.toppings;
  const sizes = selectedItem && selectedItem.sizes;
  const price = selectedItem && selectedItem.price;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalCost, setTotalCost] = useState(price);
  const [costtpp, setCosttpp] = useState(0);
  const [checkedList, setCheckedList] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [note, setNote] = useState(null);
  const { Option } = Select;
  const success = () => {
    message.success("Added to cart success!");
  };
  const sendData = (order) => {
    props.parentCallback(order);
  };
  const options = [];
  toppings &&
    toppings.map((topping) => {
      options.push({
        label: topping.name,
        value: topping.id,
      });
    });
  const changeList = (list) => {
    const listObject = [];
    list.map((li) => {
      const li1 = {};
      li1["id"] = li;
      listObject.push(li1);
    });
    setCheckedList(listObject);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const data = {
      order: {
        quantity: quantity,
        note: note,
        size: { id: size },
        product: { id: selectedItem.id },
        toppings: checkedList,
      },
      detail: {
        detail: selectedItem,
        totalCost: totalCost,
      },
    };
    success();
    sendData(data);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChange = (value) => {
    setQuantity(value);
    if (costtpp !== 0) {
      setTotalCost(costtpp + value * selectedItem.price);
    } else setTotalCost(value * selectedItem.price);
  };
  const onChangeSize = (value) => {
    setSize(value);
  };
  const onChangeNote = (value) => {
    setNote(value);
  };
  return (
    <div>
      {selectedItem && (
        <Drawer
          title="Product details"
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
                src={selectedItem && selectedItem.image}
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
                textAlign: "left",
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
              <Button
                type="primary"
                onClick={showModal}
                style={{ width: "30%" }}
              >
                Buy Now
              </Button>
            </div>
          </div>
          <hr />
          <div>{selectedItem && selectedItem.description}</div>
          <Modal
            title="Order detail"
            visible={isModalVisible}
            okText="Add to cart"
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <span>Quantity: </span>
            <InputNumber size="middle" min={1} max={20} onChange={onChange} />
            <hr />
            <span>Size: </span>
            <Select
              placeholder="Select Size"
              style={{ width: 200 }}
              onChange={(value) => onChangeSize(value)}
            >
              {sizes &&
                sizes.map((size) => {
                  return <Option value={size.id}>{size.name}</Option>;
                })}
            </Select>
            <hr />
            <span>Topping: </span>
            <Checkbox.Group options={options} onChange={changeList} />
            <hr />
            <span>Note: </span>
            <Input
              rows={2}
              onChange={(e) => {
                onChangeNote(e.target.value);
              }}
            />
            <hr />
            <p>Total cost= {totalCost}</p>
          </Modal>
        </Drawer>
      )}
    </div>
  );
}
