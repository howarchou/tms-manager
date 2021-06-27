/**
 *  Created by pw on 2020/10/9 10:08 下午.
 */
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Select } from 'antd';
import UploadComponent from '@/components/Upload';
import type { API } from '@/services/API';
import { saveBanner } from '@/services/banner';
import { areaConfig } from '@/helpers';

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
  onAdd: (data: API.Recommend) => void;
  data: API.Recommend;
  open: string;
}

const AddTypeModal = (props: AddModalIF) => {
  const { data = { sort: 1 } as API.Recommend, open } = props;
  const [visible, setVisible] = useState(!!open);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setVisible(!!open);
    form.setFieldsValue(data);
  }, [data, form, open]);

  useEffect(() => {
    const items: any[]  = [];
    // eslint-disable-next-line no-return-assign
    areaConfig().map(province =>
      items[province.value] = province.text
    );
    setProvinces(items);
  }, []);

  const handleOk = async () => {
    const values = await form.validateFields();
    const results = await saveBanner({
      ...values,
      status: data?.status || 0,
      id: data?.id,
    } as any);
    props.onAdd(results);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        新增
      </Button>
      <Modal width={600} title="添加" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form<API.Type>
          {...formItemLayout}
          form={form}
          name="addBanner"
          initialValues={{ ...data }}
          scrollToFirstError
        >
          <Form.Item
            label='省'
            name='province'
            rules={[{ required: true, message: '请选择省' }]}
          >
            <Select placeholder={'请选择省'}>
              {provinces.map((province) => {
                  // @ts-ignore
                return (
                    <Option key={id} value={province.id}>
                      {province.name}
                    </Option>
                  );
                },
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="名称"
            rules={[
              {
                required: true,
                message: '请输入名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="link"
            label="跳转链接"
            rules={[
              {
                required: true,
                message: '请输入链接',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sort"
            label="排序"
            rules={[
              {
                required: true,
                message: '请输入排序',
              },
              {
                type: 'number',
                message: '请输入数字',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="cover"
            label="图片上传"
            rules={[
              {
                required: false,
                message: '请上传图片',
              },
            ]}
          >
            <UploadComponent />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default (props: AddModalIF) => <AddTypeModal {...props} />;
