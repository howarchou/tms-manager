import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Space,
  TimePicker,
  Row,
  Col,
  message,
  Card,
  Input,
  InputNumber,
  Select,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

import { saveActivitying } from '@/services/activity';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import moment from 'moment';
import { API } from '@/services/API';
import { uuid } from '@/helpers/uuid';
import UploadComponent from '@/components/Upload';
import { history } from 'umi';
import { scheduleIconConfig } from '@/helpers/config';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}

const FormItemTitleLayoutSpan = 8;
const FormItemLayoutSpan = 8;
const FormItemLayoutOffset = 0;
const FormRowLayoutSpan = 12;

const Step3: React.FC<Step3Props> = (props) => {
  const [listFrom, setListFrom] = useState<FormInstance[]>([]);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ schedules: data?.schedules?.sections ?? [{}] });
  }, []);
  const { data, dispatch, submitting } = props;
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
        payload: 'feature',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await getFieldsValue();
    if (dispatch) {
      const planPromises = listFrom.map(async (form) => {
        const plan = await form.getFieldsValue();
        return plan.plans.map((plan: API.TeamBuilding_Schedule_Item) => {
          return { ...plan, time: moment(plan.time).valueOf() };
        });
      });
      const plans = await Promise.all(planPromises);
      const schedules = values.schedules.map(
        (schedule: API.TeamBuilding_Schedule_Section, index: number) => {
          const { title, sub_title, icon } = schedule;
          const items = plans[index];
          // console.log(moment(date).valueOf());
          return { title, sub_title, icon, items };
        },
      );
      const { hold_people = {}, feature = [], ...others }: any = data;
      const [first] = Array.isArray(feature) ? feature : [feature];
      const params: any = {
        ...others,
        ...hold_people,
        feature: first,
        schedules,
        sort: 1,
        status: 1,
      };
      console.log(params);
      await saveActivitying(params);
      history.push({
        pathname: '/team-building/list',
      });
      onFinish();
    }
  };

  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: {},
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const handleListFrom = (key: string, form: FormInstance) => {
    listFrom.push(form);
    setListFrom(listFrom.slice());
  };

  return (
    <Form
      style={{ height: '100%', marginTop: 40 }}
      name={'plan'}
      form={form}
      layout="vertical"
      autoComplete="off"
      hideRequiredMark={true}
    >
      <Form.List name={'schedules'}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => {
              const section = data?.schedules?.sections
                ? data?.schedules?.sections[index]
                : undefined;
              return (
                <Card
                  key={field.key}
                  title={`方案${index + 1}`}
                  style={{ marginTop: 20 }}
                  extra={
                    <Space align={'center'}>
                      <PlusOutlined onClick={() => add()} />
                      <MinusCircleOutlined
                        onClick={() => {
                          if (fields.length !== 1) {
                            remove(field.name);
                            listFrom.splice(field.name, 1);
                            setListFrom(listFrom.slice());
                          } else {
                            message.warning('至少保留一个');
                          }
                        }}
                      />
                    </Space>
                  }
                >
                  <Card
                    type="inner"
                    title={
                      <Row
                        key={field.key}
                        gutter={FormRowLayoutSpan}
                        style={{
                          display: 'flex',
                          marginBottom: 8,
                          justifyContent: 'center',
                          flex: 1,
                        }}
                      >
                        <Col span={FormItemTitleLayoutSpan} offset={FormItemLayoutOffset}>
                          <Form.Item
                            {...field}
                            label="图标"
                            name={[field.name, 'icon']}
                            fieldKey={[field.fieldKey, 'icon']}
                            rules={[{ required: true, message: '请选择图标' }]}
                          >
                            <Select placeholder={'请选择图标'}>
                              {scheduleIconConfig().map((icon) => {
                                return (
                                  <Select.Option key={icon.value} value={icon.value}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <img
                                        src={icon.icon}
                                        style={{ marginRight: 8, width: 10, height: 12 }}
                                      />
                                      {icon.text}
                                    </div>
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={FormItemTitleLayoutSpan} offset={FormItemLayoutOffset}>
                          <Form.Item
                            {...field}
                            label="标题"
                            name={[field.name, 'title']}
                            fieldKey={[field.fieldKey, 'title']}
                            rules={[{ required: true, message: '请输入标题' }]}
                          >
                            <Input placeholder={'请输入标题'} />
                          </Form.Item>
                        </Col>
                        <Col span={FormItemTitleLayoutSpan} offset={FormItemLayoutOffset}>
                          <Form.Item
                            {...field}
                            label="描述"
                            name={[field.name, 'sub_title']}
                            fieldKey={[field.fieldKey, 'sub_title']}
                            rules={[{ required: true, message: '请输入描述' }]}
                          >
                            <Input placeholder={'请输入描述'} />
                          </Form.Item>
                        </Col>
                      </Row>
                    }
                  >
                    <FormItemList
                      uuidKey={uuid(8)}
                      onUpdateFrom={handleListFrom}
                      value={section?.items}
                    />
                  </Card>
                </Card>
              );
            })}
          </>
        )}
      </Form.List>
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
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
        </Space>
      </Row>
    </Form>
  );
};

interface FormItemListProps {
  uuidKey: string;
  value?: API.TeamBuilding_Schedule_Item[];
  onUpdateFrom: (key: string, form: FormInstance) => void;
}

const FormItemList = (props: FormItemListProps) => {
  const { uuidKey, onUpdateFrom, value } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    const plans = value
      ? value.map((item) => {
          return { ...item, time: moment(item.time) };
        })
      : [{}];
    form.setFieldsValue({ plans });
    onUpdateFrom(uuidKey, form);
  }, []);
  return (
    <Form
      style={{ height: '100%' }}
      name={'plan'}
      form={form}
      layout="vertical"
      autoComplete="off"
      hideRequiredMark={true}
    >
      <Form.List name={'plans'}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <Row
                  key={field.key}
                  gutter={FormRowLayoutSpan}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'center',
                    flex: 1,
                  }}
                >
                  <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
                    <Form.Item
                      {...field}
                      label="天数"
                      name={[field.name, 'day']}
                      fieldKey={[field.fieldKey, 'day']}
                      rules={[{ required: true, message: '请输入天数' }]}
                    >
                      <InputNumber style={{ width: '100%' }} placeholder={'请输入天数'} />
                    </Form.Item>
                  </Col>
                  <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
                    <Form.Item
                      {...field}
                      label="具体时间"
                      name={[field.name, 'time']}
                      fieldKey={[field.fieldKey, 'time']}
                      rules={[{ required: true, message: '请选择时间' }]}
                    >
                      <TimePicker style={{ width: '100%' }} format={'HH:mm'} />
                    </Form.Item>
                  </Col>
                  <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
                    <Form.Item
                      className={styles.actionRowWrapper}
                      {...field}
                      name={[field.name, 'pictures']}
                      fieldKey={[field.fieldKey, 'pictures']}
                      rules={[{ required: true, message: '请选择图片' }]}
                    >
                      <UploadComponent showUploadList={true} multiple={true} />
                    </Form.Item>
                    <Space className={styles.actionRow} align={'center'}>
                      <PlusOutlined onClick={() => add()} />
                      <MinusCircleOutlined
                        onClick={() => {
                          if (fields.length !== 1) {
                            remove(field.name);
                          } else {
                            message.warning('至少保留一个');
                          }
                        }}
                      />
                    </Space>
                  </Col>
                </Row>
              ))}
            </>
          );
        }}
      </Form.List>
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
)(Step3);
