/**
 *  Created by pw on 2020/9/3 9:00 上午.
 */
import React from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import styles from './AddTeambuildPanel.less';

export default function () {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 16, offset: 4 },
      sm: { span: 16, offset: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div className={styles.add_teambuilding_panel}>
      <Form {...formItemLayout} layout={'inline'} form={form}>
        <Form.Item label="活动标题" name={'title'}>
          <Input placeholder="请输入活动标题" />
        </Form.Item>
        <Form.Item label="团建玩法" name={'playType'}>
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="人均价格" name="price">
          <Input placeholder="请输入价格" />
        </Form.Item>
        <Form.Item label="可接纳人数" name="capacity">
          <Input placeholder="请输入人数" />
        </Form.Item>
        <Form.Item label="活动周期" name="cycle">
          <Input placeholder="请输入周期" />
        </Form.Item>
        <Form.Item label="活动地区" name="area">
          <Input placeholder="请输入地区" />
        </Form.Item>
        <Form.Item label="是否展示" name="display" {...formItemLayout}>
          <Select>
            <Select.Option value={'add'}>已上架</Select.Option>
            <Select.Option value={'remove'}>已下架</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Row className={styles.add_button}>
        <Col offset={2}>
          <Button type="primary">新增</Button>
        </Col>
      </Row>
    </div>
  );
}
