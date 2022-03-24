import React, { useEffect } from 'react';
import { Form, Button, Space, Row, Col, Input, Card } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';

// import { saveActivitying } from '@/services/activity';
import UploadComponent from '@/components/Upload';
import { getDefaultValue } from '@/helpers';
import { useBuild } from "@/utils/useBuild"

interface Step2Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}

const FormItemLayoutSpan = 8;
const FormRowLayoutSpan = 16;

const Step2: React.FC<Step2Props> = (props) => {
  const { data = getDefaultValue(), dispatch, submitting } = props;
  const [form] = Form.useForm();
  const [ cacheButton, allSubmitButton ] = useBuild(data, form, dispatch, submitting)
  useEffect(() => {
    form.setFieldsValue({
      ...data,
    });
  }, [data, form]);
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
        payload: 'basic',
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
        payload: 'schedule',
      });
    }
  };

  return (
    <Form
      style={{ height: '100%', marginTop: 40 }}
      name={'plan'}
      form={form}
      layout='horizontal'
      autoComplete='off'
      initialValues={data}
    >
      <Card key={'feature'} title='团建特色'>
        <Row gutter={FormRowLayoutSpan}>
          <Col span={16}>
            <Form.Item
              label='特色描述'
              name={['feature', 'description']}
              rules={[{ message: '请输入特色描述' }]}
            >
              <Input.TextArea placeholder='请输入特色描述' autoSize={{ minRows: 4 }} />
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan}>
            <Form.Item
              name={['feature', 'picture']}
              rules={[{ message: '请团建特色图片' }]}
            >
              <UploadComponent />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card key={'place'} title='场地' style={{ marginTop: 16 }}>
        <Row gutter={FormRowLayoutSpan}>
          <Col span={16}>
            <Form.Item
              label='场地描述'
              name={['place', 'description']}
              rules={[{ required: true, message: '请输入场地描述' }]}
            >
              <Input.TextArea placeholder='请输入场地描述' autoSize={{ minRows: 4 }} />
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan}>
            <Form.Item
              name={['place', 'pictures']}
              rules={[{ required: true, message: '请上传场地图片' }]}
            >
              <UploadComponent max={2} multiple={true} showUploadList={true} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
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



        { cacheButton }
        { allSubmitButton }

        <Button type='primary' onClick={onValidateForm} loading={submitting}>
          下一步
        </Button>
      </Space>
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
)(Step2);
