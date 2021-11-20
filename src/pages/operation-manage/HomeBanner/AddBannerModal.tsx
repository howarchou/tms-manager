/**
 *  Created by pw on 2020/10/9 10:08 下午.
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import UploadComponent from '@/components/Upload';
import { API } from '@/services/API';
import { saveBanner } from '@/services/banner';

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16}
  }
};

interface AddModalIF {
  onAdd: (data: API.HomeBanner) => void;
  data: API.HomeBanner;
  open: string;
}

const AddBannerModal = (props: AddModalIF) => {
  const {data = {sort: 1} as API.HomeBanner, open} = props;
  const [visible, setVisible] = useState(!!open);
  const [dataValue, setDataValue] = useState(data);
  const [form] = Form.useForm();

  useEffect(() => {
    setVisible(!!open);
    form.setFieldsValue(data);
    setDataValue(data);
  }, [open]);

  const handleAdd = () => {
    form.resetFields();
    setDataValue({} as API.HomeBanner);
    setVisible(true);
  };

  const handleOk = async () => {
    const record = await form.validateFields();
    if(record.province === '北京') {
      record.province = 11
    }
    else if(record.province === '上海') {
      record.province = 31
    }
    const results = await saveBanner({
      ...record,
      status: dataValue?.status || 0,
      id: dataValue?.id
    } as API.HomeBanner);
    props.onAdd(results);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => handleAdd()}>
        新增
      </Button>
      <Modal width={600} title="添加" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form<API.HomeBanner>
          {...formItemLayout}
          form={form}
          name="addBanner"
          initialValues={{...dataValue}}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="分类名称"
            rules={[
              {
                required: true,
                message: '请输入名称'
              }
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="link"
            label="跳转链接"
            rules={[
              {
                required: true,
                message: '请输入链接'
              }
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="province"
            label="地区"
            rules={[
              {
                required: true,
                message: '请选择地区'
              }
            ]}
          >
            <Select>
              <Select.Option value={''}>不限</Select.Option>
              <Select.Option value={'北京'}>北京</Select.Option>
              <Select.Option value={'上海'}>上海</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="sort"
            label="排序"
            rules={[
              {
                required: true,
                message: '请输入排序'
              },
              {
                type: 'number',
                message: '请输入数字'
              }
            ]}
          >
            <InputNumber/>
          </Form.Item>
          <Form.Item
            name="cover"
            label="图片上传"
            rules={[
              {
                required: false,
                message: '请上传图片'
              }
            ]}
          >
            <UploadComponent/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default (props: AddModalIF) => <AddBannerModal {...props} />;
