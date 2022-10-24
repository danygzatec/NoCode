import { Button, Checkbox, Form, Input } from "antd";
import React from "react";

function ChildForm(props) {
  const [form] = Form.useForm();

  if (props.submit) {
    console.log('submitted')
    form.submit();
  }
  const onFinish = (values) => {
    console.log("Success:", values);
    props.setSubmit(false)
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    props.setSubmit(false)
  };
  return (
    <Form
      form = {form}
      id="myForm"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  
}

export default ChildForm;
