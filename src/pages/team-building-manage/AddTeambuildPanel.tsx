/**
 *  Created by pw on 2020/9/3 9:00 上午.
 */
import React from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import styles from './AddTeambuildPanel.less';
import { uuid } from '@/helpers';

interface Props {
  onResult: (values: API.TeamBuilding) => void;
  values?: API.TeamBuilding;
}

export default function (props: Props) {
  const [form] = Form.useForm();
  const { values, onResult } = props;

  const handleAdd = async () => {
    const fieldsValue = await form.validateFields();
    const values = { ...fieldsValue, id: uuid(8) };
    onResult(values as API.TeamBuilding);
    form.resetFields();
  };
  const style = { flex: 1 };

  return (
    <div className={styles.add_teambuilding_panel}>
      <Form<API.TeamBuilding>
        {...formItemLayout}
        form={form}
        name={'addTeamBuilding'}
        scrollToFirstError
        initialValues={values}
      >
        <Row>
          <Form.Item
            style={style}
            label="活动标题"
            name={'name'}
            rules={[{ type: 'string', required: true, message: '请输入标题' }]}
          >
            <Input placeholder="请输入活动标题" />
          </Form.Item>
          <Form.Item
            style={style}
            label="团建玩法"
            name={'playType'}
            rules={[{ type: 'string', required: true, message: '请输入团建玩法' }]}
          >
            <Input placeholder="请输入团建玩法" />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            style={style}
            label="人均价格"
            name="price"
            rules={[{ type: 'string', required: true, message: '请输入价格' }]}
          >
            <Input placeholder="请输入价格" />
          </Form.Item>
          <Form.Item
            style={style}
            label="可接纳人数"
            name="capacity"
            rules={[{ type: 'string', required: true, message: '请输入人数' }]}
          >
            <Input placeholder="请输入人数" />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            style={style}
            label="活动周期"
            name="cycle"
            rules={[{ type: 'string', required: true, message: '请输入活动周期' }]}
          >
            <Input placeholder="请输入周期" />
          </Form.Item>
          <Form.Item
            style={style}
            label="活动地区"
            name="area"
            rules={[{ type: 'string', required: true, message: '请输入活动地区' }]}
          >
            <Input placeholder="请输入地区" />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            style={style}
            label="是否展示"
            name="display"
            {...formItemDisplay}
            rules={[{ type: 'string', required: true, message: '请选择是否展示' }]}
          >
            <Select placeholder={'请选择'}>
              <Select.Option value={'add'}>已上架</Select.Option>
              <Select.Option value={'remove'}>已下架</Select.Option>
            </Select>
          </Form.Item>
        </Row>
      </Form>
      <Row className={styles.add_button}>
        <Col offset={2}>
          <Button type="primary" onClick={handleAdd}>
            新增
          </Button>
        </Col>
      </Row>
    </div>
  );
}

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

const formItemDisplay = {
  labelCol: {
    sm: { span: 3 },
  },
  wrapperCol: {
    sm: { span: 8 },
  },
};
