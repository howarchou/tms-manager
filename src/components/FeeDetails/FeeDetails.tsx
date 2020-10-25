/**
 *  Created by pw on 2020/10/24 2:02 下午.
 */
import React, { useState, useEffect, FC } from 'react';
import { Modal, Form, Input, Button, Space, Row, Col, InputNumber, Descriptions, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FeeDetailSaveIF, saveFeeDetail, getFeeDetail } from '@/services/feeDetail';
import { API } from '@/services/API';

interface Props {
  open: string;
  id: string | undefined;
  type?: 'order' | 'activity';
}

const SCALE = 2;

export default function (props: Props) {
  const { open, id, type = 'order' } = props;
  const [visible, setVisible] = useState(!!open);
  const [data, setData] = useState<API.FeeDetail[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setVisible(!!open);
    if (id) {
      getFeeDetail(id, type).then((data) => {
        setData(data);
        form.setFieldsValue({ fees: data });
      });
    } else {
      form.setFieldsValue({ fees: [{}] });
    }
  }, [open]);

  const handleValueChange = (values: any) => {
    const value = form.getFieldsValue();
    console.log(value.fees);
    setData(value.fees);
  };

  const handleOk = async () => {
    const values: any = await form.validateFields();
    console.log(values);
    const key = type === 'order' ? 'order_id' : 'activity_id';
    await saveFeeDetail(type, { fees: values.fees, [key]: id! } as FeeDetailSaveIF);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      maskClosable={false}
      width={900}
      title="添加明细"
      visible={visible}
      okText={'保存'}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {type === 'activity' ? <FeeDetailCalculate data={data} /> : null}
      <Form
        form={form}
        name="feeDetailForm"
        layout="vertical"
        autoComplete="off"
        hideRequiredMark={true}
        onValuesChange={handleValueChange}
      >
        <Form.List name="fees">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{
                    display: 'flex',
                    marginTop: type === 'activity' ? 20 : 0,
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
                    <InputNumber placeholder="价格" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={'成本价:'}
                    name={[field.name, 'cost_price']}
                    fieldKey={[field.fieldKey, 'cost_price']}
                    rules={[{ required: true, message: '请填写优惠价', type: 'number' }]}
                  >
                    <InputNumber placeholder="优惠价" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={'数量:'}
                    name={[field.name, 'num']}
                    fieldKey={[field.fieldKey, 'num']}
                    rules={[{ required: true, message: '请填写数量', type: 'number' }]}
                  >
                    <InputNumber placeholder="数量" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={'天数:'}
                    name={[field.name, 'days']}
                    fieldKey={[field.fieldKey, 'days']}
                    rules={[{ required: true, message: '请填写天数', type: 'number' }]}
                  >
                    <InputNumber placeholder="天数" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={'总价:'}
                    name={[field.name, 'total_price']}
                    fieldKey={[field.fieldKey, 'total_price']}
                    rules={[{ required: true, message: '请填写总价', type: 'number' }]}
                  >
                    <InputNumber placeholder="总价" />
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
      </Form>
    </Modal>
  );
}

interface FeeDetailCalculateProps {
  data: API.FeeDetail[];
}

const FeeDetailCalculate: FC<FeeDetailCalculateProps> = (props) => {
  const { data = [] } = props;
  const [num, setNum] = useState(1);
  const sum = data.reduce((sum, detail) => {
    const price = Number(detail?.total_price) || 0;
    sum = sum + price;
    return sum;
  }, 0);

  const PeopleNum: FC<{ num: number }> = ({ num }) => {
    return (
      <Row align="middle">
        <span style={{ marginRight: 10 }}>人数:</span>
        <InputNumber
          value={num}
          placeholder={'人数'}
          onChange={(value) => setNum(value as number)}
        />
      </Row>
    );
  };

  return (
    <Card>
      <Descriptions title={'统计信息'} column={4} extra={<PeopleNum num={num} />}>
        <Descriptions.Item label={'总计'}>{Number(sum).toFixed(SCALE)}</Descriptions.Item>
        <Descriptions.Item label={'含税'}>
          {Number(sum * Number(1 + 0.26)).toFixed(SCALE)}
        </Descriptions.Item>
        <Descriptions.Item label={'税率'}>{'6.00%'}</Descriptions.Item>
        <Descriptions.Item label={'人均'}>
          {num ? Number(sum / num).toFixed(SCALE) : '0.00'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
