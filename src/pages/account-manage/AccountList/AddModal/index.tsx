import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

interface AddModalIF {
  onAdd: (data: API.AddAccount, isAdd: boolean) => void;
  data: API.AddAccount;
  visibleModal: boolean;
}

const AddModal = (props: AddModalIF) => {
  const { visibleModal, data = {} as API.AddAccount } = props;
  const [visible, setVisible] = useState(visibleModal);
  const [form] = Form.useForm();

  useEffect(() => {
    setVisible(visibleModal);
  }, [visibleModal]);

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values);
    props.onAdd(values as API.AddAccount, !data.phone);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        添加
      </Button>
      <Modal width={600} title="新增账号" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form<API.AddAccount>
          {...formItemLayout}
          form={form}
          name="addUser"
          initialValues={{
            role: 'admin',
            ...data,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              {
                type: 'email',
                message: '请输入邮箱',
              },
              {
                required: true,
                message: '请输入邮箱',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            rules={[
              {
                required: true,
                message: '请输入姓名',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
            <Select>
              <Option value="admin">管理员</Option>
              <Option value="user">普通用户</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default (props: AddModalIF) => <AddModal {...props} />;
