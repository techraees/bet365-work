"use client"
import React from 'react'
import { Button, Form, Input, Radio } from 'antd';


type FieldType = {
  username?: string;
  password?: string;
  confirm_password?: string;
};

function AddUserTab() {

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

  return (
    <div className="w-50"> 
        <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 9 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
        <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input className='rounded-none '/>
        </Form.Item>

        <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input className='rounded-none'/>
        </Form.Item>
        <Form.Item<FieldType>
        label="Confirm Password"
        name="confirm_password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input className='rounded-none'/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset:6, span: 9 }}>
                <Button className='w-full' htmlType="submit">
                        Submit
                </Button>
        </Form.Item>
    </Form>
    </div>
  )
}

export default AddUserTab
