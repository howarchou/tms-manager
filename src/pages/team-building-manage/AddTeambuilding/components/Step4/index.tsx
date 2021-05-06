import React, { FC, useEffect, useState } from 'react';
import { Form, Button, Space, Row, Col, Input, InputNumber, Card, Descriptions } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { API } from '@/services/API';

interface Step4Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}
const { TextArea } = Input;
const FormItemLayoutOffset = 0;
const SCALE = 2;
let sum: number = 0;
const num = 0;

const Step4: React.FC<Step4Props> = (props) => {
  const { data, dispatch, submitting } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      ...data
    });
  }, );
  if (!data) {
    return null;
  }
  const { getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'schedule',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await form.validateFields();
    // const values = await getFieldsValue();
    if (dispatch) {
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'notice',
      });
    }
  };

  const handleTotalPrice = () => {
    const value = form.getFieldsValue();
    const {fee} = value;
    if (fee && fee.length) {
        const calFee = fee.map((feeItem: { days: number; price: number; num: number; total_price: any }) => {
          if (Number.isNaN(feeItem.days) || Number.isNaN(feeItem.price) || Number.isNaN(feeItem.num)) {
            return feeItem;
          }
          // eslint-disable-next-line no-param-reassign
          feeItem.total_price = feeItem.days * feeItem.price * feeItem.num;
          return { ...feeItem};
        });
       form.setFieldsValue({ ...calFee });
    }
  };

  return (
    <>
    <Form
      style={{ height: '100%', marginTop: 40 }}
      name={'plan'}
      form={form}
      layout="horizontal"
      autoComplete="off"
      initialValues={data}
    >
      {/*<FeeDetails id={data?.id} type={'activity'} />*/}
      <Form.List name="fee">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space
                key={field.key}
                style={{
                  display: 'flex',
                  marginTop: 20,
                  marginBottom: 8,
                }}
                align="center"
              >
                <Form.Item
                  {...field}
                  label={'项目:'}
                  name={[field.name, 'name']}
                  fieldKey={[field.fieldKey, 'name']}
                  rules={[{ required: true, message: '请填写项目' }]}
                >
                  <Input placeholder="项目" />
                </Form.Item>
                <Form.Item
                  {...field}
                  label={'描述:'}
                  name={[field.name, 'intro']}
                  fieldKey={[field.fieldKey, 'intro']}
                  rules={[{ required: true, message: '请填写描述' }]}
                >
                  <Input placeholder="描述" />
                </Form.Item>
                <Form.Item
                  {...field}
                  label={'优惠价:'}
                  name={[field.name, 'price']}
                  fieldKey={[field.fieldKey, 'price']}
                  rules={[{ required: true, message: '请填写价格', type: 'number' }]}
                >
                  <InputNumber placeholder="优惠价" onChange={handleTotalPrice}/>
                </Form.Item>
                <Form.Item
                  {...field}
                  label={'成本价:'}
                  name={[field.name, 'cost_price']}
                  fieldKey={[field.fieldKey, 'cost_price']}
                  rules={[{ required: true, message: '请填写优惠价', type: 'number' }]}
                >
                  <InputNumber placeholder="成本价"  />
                </Form.Item>
                <Form.Item
                  {...field}
                  label={'数量:'}
                  name={[field.name, 'num']}
                  fieldKey={[field.fieldKey, 'num']}
                  rules={[{ required: true, message: '请填写数量', type: 'number' }]}
                >
                  <InputNumber placeholder="数量" onChange={handleTotalPrice} />
                </Form.Item>
                <Form.Item
                  {...field}
                  label={'天数:'}
                  name={[field.name, 'days']}
                  fieldKey={[field.fieldKey, 'days']}
                  rules={[{ required: true, message: '请填写天数', type: 'number' }]}
                >
                  <InputNumber placeholder="天数" onChange={handleTotalPrice} />
                </Form.Item>
                <Form.Item
                  {...field}
                  label={'总价:'}
                  name={[field.name, 'total_price']}
                  fieldKey={[field.fieldKey, 'total_price']}
                  rules={[{ required: true, message: '请填写总价', type: 'number' }]}
                >
                  <InputNumber disabled={true} placeholder="总价" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Row justify="space-around" align={'middle'}>
                <Col span={6}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加项目
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Row>
        <Col span={6} offset={FormItemLayoutOffset}>
          <Form.Item
            label="单价"
            name="price"
            rules={[
              { required: true, message: '请输入单价' },
              {
                pattern: /^(\d+)((?:\.\d+)?)$/,
                message: '请输入合法金额数字',
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="单价" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} offset={FormItemLayoutOffset}>
          <Form.Item
            label="不包含"
            name="cost_statement"
            rules={[{ required: true, message: '请输入不包含说明' }]}
          >
            <TextArea placeholder="费用不包含说明" autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
        </Col>
      </Row>
      <Space
        style={{
          marginTop: 40,
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'center',
          flex: 1,
        }}
        align={'baseline'}
      >
        <Button onClick={onPrev} style={{ marginRight: 8 }}>
          上一步
        </Button>
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          下一步
        </Button>
      </Space>
    </Form>
    </>
  );
};
export default connect(
  ({
    addteambuilding,
    loading,
  }: {
    addteambuilding: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['addteambuilding/submitStepForm'],
    data: addteambuilding.step,
  }),
)(Step4);
