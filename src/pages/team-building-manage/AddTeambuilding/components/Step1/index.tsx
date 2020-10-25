import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select } from 'antd';
const { TextArea } = Input;
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';
import UploadComponent from '@/components/Upload';
import Rate from '@/components/Rates';
import HoldInputWrapper from './HoldInputWrapper';
import {
  areaConfig,
  durationConfig,
  getDefaultValue,
  methodConfig,
  profitConfig,
} from '../../../config';
import PriceDetails from '@/components/PriceElemets/PriceDetails';
import FeeDetails from '@/components/FeeDetails/FeeDetails';
import { uuid } from '@/helpers';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
}

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data = getDefaultValue() } = props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState('');

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
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
        payload: 'confirm',
      });
    }
  };

  const handleFeeDetail = () => {
    setOpen(uuid(8));
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
      >
        <Form.Item
          label="订单名称"
          name="name"
          rules={[{ required: true, message: '请输入订单名称' }]}
        >
          <Input placeholder="请输入订单名称" />
        </Form.Item>
        <Form.Item
          label="活动地区"
          name="area"
          rules={[{ required: true, message: '请选择活动地区' }]}
        >
          <Select>
            {areaConfig().map((area) => {
              return (
                <Option key={area.value} value={area.value}>
                  {area.text}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="详细地址"
          name="address"
          rules={[{ required: true, message: '请输入详细地址' }]}
        >
          <Input placeholder="请输入详细地址" />
        </Form.Item>
        <Form.Item
          label="团建玩法"
          name="method"
          rules={[{ required: true, message: '请选择团建玩法' }]}
        >
          <Select>
            {methodConfig().map((area) => {
              return (
                <Option key={area.value} value={area.value}>
                  {area.text}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="团建收益"
          name="profit"
          rules={[{ required: true, message: '请选择团建收益' }]}
        >
          <Select>
            {profitConfig().map((area) => {
              return (
                <Option key={area.value} value={area.value}>
                  {area.text}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="团建天数"
          name="duration"
          rules={[{ required: true, message: '请选择团建天数' }]}
        >
          <Select>
            {durationConfig().map((area) => {
              return (
                <Option key={area.value} value={area.value}>
                  {area.text}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="容纳人数"
          name="hold_people"
          rules={[{ required: true, message: '请输入容纳人数' }]}
        >
          <HoldInputWrapper />
        </Form.Item>
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
          <PriceDetails showLabel={!!data?.id} onFeeDetailClick={handleFeeDetail} />
        </Form.Item>
        <Form.Item
          label="团建策划师"
          name="planner"
          rules={[{ required: true, message: '请输入团建策划师' }]}
        >
          <Input placeholder="团建策划师" />
        </Form.Item>
        <Form.Item
          label="策划师电话"
          name="mobile"
          rules={[{ required: true, message: '请输入策划师电话' }]}
        >
          <Input placeholder="策划师电话" />
        </Form.Item>
        <Form.Item
          label="活动描述"
          name="description"
          rules={[{ required: true, message: '请输入活动描述' }]}
        >
          <TextArea placeholder="活动描述" autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Form.Item label="标签" name="tags" rules={[{ required: true, message: '请输入标签' }]}>
          <TextArea placeholder="请输入标签，顿号隔开" autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Form.Item
          label="封面图(最多10张)"
          name="cover"
          rules={[{ required: true, message: '请上传封面' }]}
        >
          <UploadComponent />
        </Form.Item>
        <Form.Item
          label="预订须知"
          name="booking_notes"
          rules={[{ required: true, message: '请输入预订须知' }]}
        >
          <TextArea placeholder="预订须知" autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Form.Item
          label="温馨提示"
          name="warm_tips"
          rules={[{ required: true, message: '请输入温馨提示' }]}
        >
          <TextArea placeholder="温馨提示" autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Form.Item
          label="推荐指数"
          name="stars"
          rules={[{ required: true, message: '请输入推荐指数' }]}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Rate label="餐饮指数" />
            <Rate label="体力指数" />
            <Rate label="风景指数" />
            <Rate label="住宿指数" />
            <Rate label="团建指数" />
          </div>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <FeeDetails open={open} id={data?.id} type={'activity'} />
    </>
  );
};

export default connect(({ addteambuilding }: { addteambuilding: StateType }) => ({
  data: addteambuilding.step,
}))(Step1);
