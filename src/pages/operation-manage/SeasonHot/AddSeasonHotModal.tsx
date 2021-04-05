import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import UploadComponent from '@/components/Upload';
import { API } from '@/services/API';
import { saveSeasonHot } from '@/services/seasonHot';
import { areaConfig } from '@/helpers';

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

const { Option, OptGroup } = Select;

interface AddModalIF {
  onAdd: (data: API.SeasonHot) => void;
  data: API.SeasonHot;
  open: string;
}

const AddSeasonHotModal = (props: AddModalIF) => {
  const { data = { sort: 1 } as API.SeasonHot, open } = props;
  const [visible, setVisible] = useState(!!open);
  const [form] = Form.useForm();

  useEffect(() => {
    setVisible(!!open);
    form.setFieldsValue(data);
  }, [open]);

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values);
    const results = await saveSeasonHot({
      ...values,
      status: data?.status !== undefined ? data?.status : 1,
      id: data?.id,
    } as API.SeasonHot);
    props.onAdd(results);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type='primary' onClick={() => setVisible(true)}>
        新增
      </Button>
      <Modal width={600} title='添加' visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form<API.HomeBanner>
          {...formItemLayout}
          form={form}
          name='addSeasonHot'
          initialValues={{ ...data }}
          scrollToFirstError
        >
          <Form.Item
            name='name'
            label='目的地'
            rules={[
              {
                required: true,
                message: '请输入目的地',
              },
            ]}
          >
            <Input placeholder={'目的地'} />
          </Form.Item>
          <Form.Item
            name='keywords'
            label='关键词'
            rules={[
              {
                required: true,
                message: '请输入关键词, 多个空格分格',
              },
            ]}
          >
            <Input placeholder={'关键词, 多个空格分格'} />
          </Form.Item>
          <Form.Item
            label='区域'
            name='area'
            rules={[{ required: true, message: '请选择区域' }]}
          >
            <Select placeholder={'请选择区域'}>
              {areaConfig().map((province) => {
                  return (
                    <OptGroup label={province.text}>
                      {
                        province.items?.map((area) => {
                          return (
                            <Option key={area.value} value={area.value}>
                              {area.text}
                            </Option>
                          );
                        })
                      }
                    </OptGroup>
                  );
                },
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name='sort'
            label='排序'
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
            <InputNumber placeholder={'排序'} min={0} max={99999} step={1} />
          </Form.Item>
          <Form.Item
            name='cover'
            label='图片上传'
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

export default (props: AddModalIF) => <AddSeasonHotModal {...props} />;
