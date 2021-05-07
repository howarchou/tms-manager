import React, {  useEffect } from 'react';
import { Form, Button, Space, Row, Col, Input } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';

import { saveActivity } from '@/services/activity';
import { history } from 'umi';

interface Step5Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}

const { TextArea } = Input;
const FormItemLayoutOffset = 0;

const Step5: React.FC<Step5Props> = (props) => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;
  useEffect(() => {
    form.setFieldsValue({ ...data });
  }, [data, form]);
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
      name={'tips'}
      form={form}
      layout='vertical'
      autoComplete='off'
      initialValues={data}
    >
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
