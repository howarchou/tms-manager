import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import type { API } from '@/services/API';
import { saveAccount } from '@/services/account';

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
  onAdd: (data: API.Account, isAdd: boolean) => void;
  data: API.Account;
  visibleModal: boolean;
}

const AddModal = (props: AddModalIF) => {
  const { visibleModal, data = { role: 'admin' } as API.Account } = props;
  const [visible, setVisible] = useState(visibleModal);
  const [dataValue, setDataValue] = useState(data);
  const [form] = Form.useForm();

  useEffect(() => {
    setVisible(visibleModal);
    form.setFieldsValue(data);
    setDataValue(data);
  }, [data, form, visibleModal]);

  const handleOk = async () => {
    const values = await form.validateFields();
    const results = await saveAccount({
      ...values,
      id: dataValue?.id,
    } as API.Account);
    props.onAdd(results as API.Account, !data.mobile);
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
        <Form<API.Account>
          {...formItemLayout}
          form={form}
          name="addUser"
          initialValues={{ ...data }}
          scrollToFirstError
        >
          <Form.Item
            name="mobile"
            label="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
            ]}
          >
            {
              data?.mobile ?
              <Input readOnly={true} /> : <Input />
            }
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
            {
              data?.email ? <Input readOnly={true} /> :
              <Input />
            }
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
            {
              data?.name? <Input readOnly={true} /> :
              <Input />
            }
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

          {/* <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}> */}
          {/*  <Select> */}
          {/*    <Option value="admin">管理员</Option> */}
          {/*    <Option value="user">普通用户</Option> */}
          {/*  </Select> */}
          {/* </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default (props: AddModalIF) => <AddModal {...props} />;
