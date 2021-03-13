import React, { useState, useEffect } from 'react';
import { Form, Button, Space, Row, Col, Input } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';

import { saveActivity } from '@/services/activity';
import type { FormInstance } from 'antd/lib/form/hooks/useForm';
import moment from 'moment';
import type { API } from '@/services/API';
import { history } from 'umi';

interface Step5Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}

const { TextArea } = Input;
const FormItemLayoutOffset = 0;

const Step5: React.FC<Step5Props> = (props) => {
  const [listFrom] = useState<FormInstance[]>([]);
  const [form] = Form.useForm();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    form.setFieldsValue({ schedules: data?.schedules?.sections ?? [{}] });
  }, []);
  const { data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { getFieldsValue } = form;

  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: {},
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'notice',
      });
    }
  };

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
        payload: 'fee',
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
        payload: {},
      });
      // eslint-disable-next-line @typescript-eslint/no-shadow
      // const planPromises = listFrom.map(async (form) => {
      //   const plan = await form.getFieldsValue();
      //   // eslint-disable-next-line @typescript-eslint/no-shadow
      //   return plan.plans.map((plan: API.TeamBuilding_Schedule_Item) => {
      //     const time = moment(plan.time, 'HH:mm').valueOf();
      //     return { ...plan, time };
      //   });
      // });
      // const plans = await Promise.all(planPromises);
      // const schedules = values?.schedules?.map(
      //   (schedule: API.TeamBuilding_Schedule_Section, index: number) => {
      //     const { title, sub_title, icon } = schedule;
      //     const items = plans[index];
      //     return { title, sub_title, icon, items };
      //   },
      // );
      // const booking_notes = values?.booking_notes;
      // const safety_notes = values?.safety_notes;
      // const warm_tips = values?.warm_tips;
      // const { hold_people = {}, feature = [], ...others }: any = data;
      // const [first] = Array.isArray(feature) ? feature : [feature];
      if (data?.id === undefined || data?.id === 0) {
        data.status = 0;
      }
      const params: any = {
        ...data,
        ...values,
      };
      const result = await saveActivity(params);
      if (result) {
        history.push({
          pathname: '/team-building/list',
        });
        onFinish();
      }
    }
  };
  return (
    <Form
      style={{ height: '100%', marginTop: 40 }}
      name={'plan'}
      form={form}
      layout='vertical'
      autoComplete='off'
      initialValues={data}
    >
      <Row>
        <Col span={24} offset={FormItemLayoutOffset}>
          <Form.Item
            label='预定须知'
            name='booking_notes'
            rules={[{ required: true, message: '请输入预定须知' }]}
          >
            <TextArea placeholder='预定须知' autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} offset={FormItemLayoutOffset}>
          <Form.Item
            label='安全须知'
            name='safety_notes'
            rules={[{ required: true, message: '请输入安全须知' }]}
          >
            <TextArea placeholder='安全须知' autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} offset={FormItemLayoutOffset}>
          <Form.Item
            label='温馨提示'
            name='warm_tips'
            rules={[{ required: true, message: '请输入温馨提示' }]}
          >
            <TextArea placeholder='温馨提示' autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Space
          style={{
            marginTop: 20,
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
          <Button type='primary' onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
        </Space>
      </Row>
    </Form>
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
)(Step5);
