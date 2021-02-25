import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select, Row, Col, Space, InputNumber } from 'antd';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
import { StateType } from '../../model';
import UploadComponent from '@/components/Upload';
import { RateGroup } from '@/components/Rates';
import { IconSelect } from '../IconSelect';
import RichTextBox from '@/components/RichTextBox';

import {
  areaConfig,
  durationConfig,
  getDefaultValue,
  methodConfig,
  profitConfig,
  starConfig,
  typeIconConfig,
} from '@/helpers/config';
import PriceDetails from '@/components/PriceElemets/PriceDetails';
import FeeDetails from '@/components/FeeDetails/FeeDetails';
import { uuid } from '@/helpers';

const { TextArea } = Input;
const { Option } = Select;

interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
}

const FormItemLayoutSpan = 4;
const FormItemLayoutOffset = 0;
const FormRowLayoutSpan = 12;

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data = getDefaultValue() } = props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState('');

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        hold_people: { hold_min: data?.hold_min, hold_max: data?.hold_max },
      });
    }
  }, [data?.id]);

  if (!data) {
    return null;
  }
  const { getFieldsValue } = form;
  const onValidateForm = async () => {
    // const values = await validateFields();
    const values = await getFieldsValue();
    if (dispatch) {
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'place',
      });
    }
  };

  const handleFeeDetail = () => {
    setOpen(uuid(8));
  };

  return (
    <>
      <Form
        className={styles.stepForm}
        form={form}
        layout="vertical"
        hideRequiredMark
        initialValues={data}
      >
        <Row gutter={FormRowLayoutSpan}>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label="订单名称"
              name="name"
              rules={[{ required: true, message: '请输入订单名称' }]}
            >
              <Input placeholder="请输入订单名称" />
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label="活动地区"
              name="area"
              rules={[{ required: true, message: '请选择活动地区' }]}
            >
              <Select placeholder={'请选择活动地区'}>
                {areaConfig().map((area) => {
                  return (
                    <Option key={area.value} value={area.value}>
                      {area.text}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label="详细地址"
              name="address"
              rules={[{ required: true, message: '请输入详细地址' }]}
            >
              <Input placeholder="请输入详细地址" />
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label="团建玩法"
              name="method"
              rules={[{ required: true, message: '请选择团建玩法' }]}
            >
              <Select placeholder={'请选择团建玩法'}>
                {methodConfig().map((area) => {
                  return (
                    <Option key={area.value} value={area.value}>
                      {area.text}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label="团建收益"
              name="profits"
              rules={[{ required: true, message: '请选择团建收益' }]}
            >
              <Select mode={'tags'} placeholder={'请选择团建收益'}>
                {profitConfig().map((area) => {
                  return (
                    <Option key={area.value} value={area.value}>
                      {area.text}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label="团建天数"
              name="duration"
              rules={[{ required: true, message: '请选择团建天数' }]}
            >
              <Select placeholder={'请选择团建天数'}>
                {durationConfig().map((area) => {
                  return (
                    <Option key={area.value} value={area.value}>
                      {area.text}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={FormRowLayoutSpan}>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label="活动人数"
              name="people_number"
              rules={[{ required: true, message: '请输入活动人数' }]}
            >
              <InputNumber placeholder={'请输入活动人数'} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label="人均消费"
              name="price"
              rules={[
                { required: true, message: '请输入人均消费' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入合法金额数字',
                },
              ]}
            >
              <PriceDetails
                className="activityFeeDetail"
                showLabel={!!data?.id}
                onFeeDetailClick={handleFeeDetail}
              />
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label="团建策划师"
              name="planner"
              rules={[{ required: true, message: '请输入团建策划师' }]}
            >
              <Input placeholder="团建策划师" />
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label="策划师电话"
              name="mobile"
              rules={[{ required: true, message: '请输入策划师电话' }]}
            >
              <Input placeholder="策划师电话" />
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item label="类别" name="type" rules={[{ required: true, message: '请选择类别' }]}>
              <IconSelect data={typeIconConfig()} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={FormRowLayoutSpan}>
          <Col span={8} offset={FormItemLayoutOffset}>
            <Form.Item
              label="活动特色"
              name="description"
              rules={[{ required: true, message: '请输入活动特色' }]}
            >
              <TextArea placeholder="活动特色" autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
          </Col>
          <Col span={8} offset={FormItemLayoutOffset}>
            <Form.Item
              label="温馨提示"
              name="warm_tips"
              rules={[{ required: true, message: '请输入温馨提示' }]}
            >
              <TextArea placeholder="温馨提示" autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={FormRowLayoutSpan}>
          <Form.Item name="booking_notes" rules={[{ required: true, message: '请输入预定须知' }]}>
            <RichTextBox label={'预定须知'} placeholder={'请输入预定须知'} />
          </Form.Item>
        </Row>

        <Form.Item label="封面图" name="cover" rules={[{ required: true, message: '请上传封面' }]}>
          <UploadComponent />
        </Form.Item>

        <Form.Item
          label="推荐指数"
          name="stars"
          rules={[{ required: true, message: '请输入推荐指数' }]}
        >
          <RateGroup rates={starConfig()} />
        </Form.Item>
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
          <Form.Item>
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Space>
      </Form>
      <FeeDetails open={open} id={data?.id} type={'activity'} />
    </>
  );
};

export default connect(({ addteambuilding }: { addteambuilding: StateType }) => ({
  data: addteambuilding.step,
}))(Step1);
