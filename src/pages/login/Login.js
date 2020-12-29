import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import { Form, Input, Button } from "antd";
import Auth from "../../api/Auth";

export default function Login() {
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
        console.log("success");
        setLoading(false);
      })
      .catch((error) => {
        onFinishFailed();
      });
  };
  const onFinishFailed = (errorInfo) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };
  if (localStorage.getItem("token")) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="login">
      <div className="login__content">
        <div className="content__left">Welcome to our website</div>
        <div className="content__right">
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
        </div>
      </div>
    </div>
  );
}
