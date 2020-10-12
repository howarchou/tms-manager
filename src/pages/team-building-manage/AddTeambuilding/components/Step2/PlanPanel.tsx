/**
 *  Created by pw on 2020/10/12 11:37 下午.
 */
import React from 'react';
import { Form, Select, TimePicker } from 'antd';
const { Option } = Select;
import styles from './index.less';
import moment from 'moment';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

export default function () {
  const [form] = Form.useForm();
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.planForm}
      initialValues={{
        day: 1,
        time: moment(),
        supplier: 'meituan',
        supplierProject: 'mountain',
      }}
    >
      <Form.Item
        label="天数"
        name="day"
        required={false}
        rules={[{ required: true, message: '请选择天数' }]}
      >
        <Select>
          <Option value={1}>第一天</Option>
          <Option value={2}>第二天</Option>
          <Option value={3}>第三天</Option>
          <Option value={4}>第四天</Option>
          <Option value={5}>第五天</Option>
          <Option value={6}>第六天</Option>
          <Option value={7}>第七天</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="具体时间"
        name="time"
        required={false}
        rules={[{ required: true, message: '请选择时间' }]}
      >
        <TimePicker style={{ width: '100%' }} format={'HH:mm'} />
      </Form.Item>
      <Form.Item
        label="供应商"
        name="supplier"
        required={false}
        rules={[{ required: true, message: '请选择供应商' }]}
      >
        <Select>
          <Option value="meituan">美团</Option>
          <Option value="yilong">艺龙</Option>
          <Option value="xiecheng">携程</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="供应商项目"
        name="supplierProject"
        required={false}
        rules={[{ required: true, message: '请选择供应商项目' }]}
      >
        <Select>
          <Option value="custom">自驾游</Option>
          <Option value="prairie">草原</Option>
          <Option value="mountain">登山</Option>
        </Select>
      </Form.Item>
    </Form>
  );
}
