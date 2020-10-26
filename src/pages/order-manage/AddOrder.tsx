import { Button, Card, DatePicker, Input, Form, InputNumber, Select, Row, Col } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from '@@/core/history';
import { saveOrder, getOrderDetail } from '@/services/order';
import { API } from '@/services/API';
import moment from 'moment';
import { detailDefaultValues } from '@/pages/order-manage/helpers';
import FeeDetails from '@/components/FeeDetails/FeeDetails';
import styles from './AddOrder.less';
import { uuid } from '@/helpers';
import PriceDetails from '@/components/PriceElemets/PriceDetails';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

interface AddorderProps {
  submitting: boolean;
  location: any;
}

const FormItemLayoutSpan = 6;
const FormItemLayoutOffset = 2;
const FormRowLayoutSpan = 24;

const AddOrder: FC<AddorderProps> = (props) => {
  const { submitting, location } = props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState('');
  const [data, setData] = useState<API.Order>();
  useEffect(() => {
    const id = location?.query?.id;
    if (id) {
      getOrderDetail(id).then((data) => {
        setData(data);
        delete data.start_date;
        form.setFieldsValue(data);
      });
    }
  }, []);

  const onFinish = async (values: { [key: string]: any }) => {
    console.log(values);
    values.start_date = moment(values.start_date || 0).valueOf();
    await saveOrder({ ...values, amount: 1, id: data?.id } as API.Order);
    history.push({ pathname: '/order/list' });
  };

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    history.push({ pathname: '/order/list' });
  };

  const handleFeeDetail = () => {
    setOpen(uuid(8));
  };

  return (
    <PageContainer title={'新增订单'} className={styles.addOrder}>
      <Card bordered={false}>
        <Form
          style={{ marginTop: 8 }}
          form={form}
          layout="vertical"
          name="addOrder"
          initialValues={detailDefaultValues(data)}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={FormRowLayoutSpan}>
            <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
              <FormItem
                label={'订单名称'}
                name="name"
                rules={[
                  {
                    required: true,
                    message: '请输入订单名称',
                  },
                ]}
              >
                <Input placeholder="请输入订单名称" />
              </FormItem>
            </Col>
            <Col span={FormItemLayoutSpan}>
              <FormItem
                label="订单状态"
                name="status"
                rules={[
                  {
                    required: true,
                    message: '请输入订单状态',
                  },
                ]}
              >
                <Select>
                  <Option value={1}>已支付</Option>
                  <Option value={2}>已上线</Option>
                  <Option value={3}>已下线</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={FormItemLayoutSpan}>
              <FormItem
                label={'单价'}
                name="price"
                rules={[
                  {
                    required: true,
                    message: '请输入单价',
                  },
                ]}
              >
                <PriceDetails showLabel={!!data?.id} onFeeDetailClick={handleFeeDetail} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={FormRowLayoutSpan}>
            <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
              <FormItem
                label="活动地区"
                name="area"
                rules={[
                  {
                    required: true,
                    message: '请输入活动地区',
                  },
                ]}
              >
                <Select>
                  <Option value={1}>北京</Option>
                  <Option value={2}>上海</Option>
                  <Option value={3}>成都</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={FormItemLayoutSpan}>
              <FormItem
                label={'详细地址'}
                name="address"
                rules={[
                  {
                    required: true,
                    message: '请输入详细地址',
                  },
                ]}
              >
                <Input placeholder="详细地址" />
              </FormItem>
            </Col>
            <Col span={FormItemLayoutSpan}>
              <FormItem
                label={'活动起始时间'}
                name="start_date"
                rules={[
                  {
                    required: true,
                    message: '请选择活动起始时间',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={FormRowLayoutSpan}>
            <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
              <FormItem
                label={'活动天数'}
                name="days"
                rules={[
                  {
                    required: true,
                    message: '请输入活动天数',
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} placeholder="活动天数" />
              </FormItem>
            </Col>
            <Col span={FormItemLayoutSpan}>
              <FormItem
                label={'活动策划师'}
                name="planner"
                rules={[
                  {
                    required: true,
                    message: '请输入活动策划师',
                  },
                ]}
              >
                <Input placeholder="请输入活动策划师" />
              </FormItem>
            </Col>
            <Col span={FormItemLayoutSpan}>
              <FormItem
                label={'策划师电话'}
                name="planner_mobile"
                rules={[
                  {
                    required: true,
                    message: '请输入策划师电话',
                  },
                ]}
              >
                <Input style={{ width: '100%' }} placeholder="策划师电话" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={FormRowLayoutSpan}>
            <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
              <FormItem
                label={'客户公司'}
                name="company"
                rules={[
                  {
                    required: true,
                    message: '请输入客户公司',
                  },
                ]}
              >
                <Input placeholder="客户公司" />
              </FormItem>
            </Col>
            <Col span={FormItemLayoutSpan}>
              <FormItem
                label={'客户联系人'}
                name="contact"
                rules={[
                  {
                    required: true,
                    message: '请输入客户联系人',
                  },
                ]}
              >
                <Input placeholder="客户联系人" />
              </FormItem>
            </Col>
            <Col span={FormItemLayoutSpan}>
              <FormItem
                label={'客户电话'}
                name="contact_mobile"
                rules={[
                  {
                    required: true,
                    message: '请输入客户电话',
                  },
                ]}
              >
                <Input style={{ width: '100%' }} placeholder="客户电话" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={FormRowLayoutSpan}>
            <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
              <FormItem
                label="来源"
                name="source"
                rules={[
                  {
                    required: true,
                    message: '来源',
                  },
                ]}
              >
                <Select>
                  <Option value={1}>小程序</Option>
                  <Option value={2}>网络订单</Option>
                  <Option value={3}>老客户介绍</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={FormRowLayoutSpan}>
            <Col span={12} offset={FormItemLayoutOffset}>
              <FormItem label={'备注'} name="remark">
                <TextArea placeholder="备注" rows={3} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={FormRowLayoutSpan} align={'middle'}>
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                {data?.id ? '更新' : '保存'}
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
                取消
              </Button>
            </div>
          </Row>
        </Form>
      </Card>
      <FeeDetails open={open} id={data?.id} />
    </PageContainer>
  );
};

export default AddOrder;
