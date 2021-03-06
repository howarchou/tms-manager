import React, { useEffect} from 'react';
import { Form, Button, Space, Row, Col, Input} from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';
import FeeDetails from '@/components/FeeDetails/FeeDetails';

interface Step4Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}
const { TextArea } = Input;
const FormItemLayoutOffset = 0;
const Step4: React.FC<Step4Props> = (props) => {
  const { data, dispatch, submitting } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (data?.feature !== undefined) {
      if (data?.places !== undefined) {
        form.setFieldsValue({
          themes: data?.themes?.length || [{}],
          feature:
            Array.isArray(data?.feature)
              ? data?.feature
              : [data?.feature],
          places:
            Array.isArray(data?.places)
              ? data?.places
              : [data?.places],
        });
      } else {
        form.setFieldsValue({
          themes: data?.themes?.length || [{}],
          feature:
            Array.isArray(data?.feature)
              ? data?.feature
              : [data?.feature],
          places:
            [{}],
        });
      }
    } else if (data?.places !== undefined) {
      form.setFieldsValue({
        themes: data?.themes?.length || [{}],
        feature:
          [{}],
        places:
          Array.isArray(data?.places)
            ? data?.places
            : [data?.places],
      });
    } else {
      form.setFieldsValue({
        themes: data?.themes?.length || [{}],
        feature:
          [{}],
        places:
          [{}],
      });
    }
  }, []);
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
    // const values = await validateFields();
    const values = await getFieldsValue();
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

  return (
    <>
    <Form
      style={{ height: '100%', marginTop: 40 }}
      name={'plan'}
      form={form}
      layout="horizontal"
      autoComplete="off"
      hideRequiredMark={true}
    >
      <FeeDetails id={data?.id} type={'activity'} />
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
