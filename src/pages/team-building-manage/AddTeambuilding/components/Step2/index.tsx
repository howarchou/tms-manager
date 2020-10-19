import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';
import PlanPanel from './PlanPanel';
import { API } from '@/services/API';
import uuid from '@/helpers/uuid';
import moment from 'moment';
import { saveActivitying } from '@/services/activity';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step2Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}

const Step2: React.FC<Step2Props> = (props) => {
  const [formItems, setFormItems] = useState<API.TeamBuildingPlan[]>([deafultProject()]);
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { validateFields, getFieldsValue } = form;
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
        payload: 'info',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await validateFields();
    const planPromises = formItems.map((plan) => {
      return plan.form?.validateFields();
    });
    const plans = await Promise.all(planPromises).catch((err) => {
      console.log(err);
      return;
    });
    console.log(plans);
    if (dispatch) {
      const { hold_people = {}, ...others }: any = data;
      const params: any = { ...values, ...others, ...hold_people, sort: 1, status: 1 };
      console.log(params);
      await saveActivitying(params);
      dispatch({
        type: 'addteambuilding/submitStepForm',
        payload: params,
      });
    }
  };

  const handleAdd = () => {
    const data = deafultProject();
    formItems.push({ ...data });
    setFormItems(formItems.slice());
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={{ password: '123456' }}
    >
      {formItems.map((item) => {
        return (
          <Form.Item key={item.id} name="plan">
            <PlanPanel plan={item} />
          </Form.Item>
        );
      })}
      <div className={styles.addPlan}>
        <Button onClick={handleAdd}>添加项目</Button>
      </div>
      <Form.Item
        style={{ marginBottom: 8 }}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
      >
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
      </Form.Item>
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

const deafultProject = (): API.TeamBuildingPlan => {
  return {
    id: uuid(8),
    day: 1,
    time: moment.now(),
    supplier: 'meituan',
    supplierProject: 'mountain',
  };
};
