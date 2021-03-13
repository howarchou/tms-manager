import React, { useState, useEffect } from 'react';
import { Form, Button, Space, Row, Col, message, Card, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

import { FormInstance } from 'antd/lib/form/hooks/useForm';
import moment from 'moment';
import { API } from '@/services/API';
import { uuid } from '@/helpers/uuid';
import UploadComponent from '@/components/Upload';
import { scheduleIconConfig } from '@/helpers/config';
import { IconSelect } from '../IconSelect';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}

const FormItemTitleLayoutSpan = 5;
const FormItemLayoutOffset = 0;
const FormRowLayoutSpan = 12;
const FormItemDetailSpan = 5;

const Step3: React.FC<Step3Props> = (props) => {
  const [listFrom, setListFrom] = useState<FormInstance[]>([]);
  const { data, dispatch, submitting } = props;
  const [form] = Form.useForm();
  if (!data) {
    return null;
  }
  if (data?.id !== undefined && data?.id > 0) {
    useEffect(() => {
      form.setFieldsValue({ schedules: data?.schedules.sections ?? [{}] });
    }, [data?.schedules, form]);
  } else {
    useEffect(() => {
      form.setFieldsValue({ schedules: data?.schedules ?? [{}] });
    }, [data?.schedules, form]);
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
        payload: 'place',
      });
    }
  };
  const onValidateForm = async () => {
    // const values = await getFieldsValue();
    const values = await form.validateFields()

    const planPromises = listFrom.map(async (form) => {
      const plan = await form.getFieldsValue();
      return plan.plans.map((plan: API.TeamBuilding_Schedule_Item) => {
        const time = moment(plan.time, 'HH:mm').valueOf();
        return { ...plan, time };
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

    if (dispatch) {
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: {
          schedules,
        },
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'fee',
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
      initialValues={data}
    >
      <Form.List name={'schedules'}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => {
              const section = data?.schedules ? data?.schedules[index] : undefined;
              return (
                <Card
                  key={field.key}
                  title={`第${index + 1}天`}
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
                          justifyContent: 'left',
                          flex: 1,
                        }}
                      >
                        <Col span={FormItemTitleLayoutSpan} offset={FormItemLayoutOffset}>
                          <Form.Item
                            {...field}
                            label="行程标题"
                            name={[field.name, 'title']}
                            fieldKey={[field.fieldKey, 'title']}
                            rules={[{ required: true, message: '请输入行程标题' }]}
                          >
                            <Input placeholder={'请输入行程标题'} />
                          </Form.Item>
                        </Col>
                        <Col span={FormItemTitleLayoutSpan} offset={FormItemLayoutOffset}>
                          <Form.Item
                            {...field}
                            label="图标"
                            name={[field.name, 'icon']}
                            fieldKey={[field.fieldKey, 'icon']}
                            rules={[{ required: true, message: '请选择图标' }]}
                          >
                            <IconSelect data={scheduleIconConfig()} />
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
            下一步
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
        return { ...item, time: moment(item.time).format('HH:mm') };
      })
      : [{}];
    form.setFieldsValue({ plans });
    onUpdateFrom(uuidKey, form);
  }, [form, value]);
  return (
    <Form
      style={{ height: '100%' }}
      name={'plan'}
      form={form}
      layout="vertical"
      autoComplete="off"
      initialValues={value}
    >
      <Form.List name={'plans'}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <div key={field.key}>
                  <Row
                    gutter={FormRowLayoutSpan}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                      justifyContent: 'left',
                      flex: 1,
                    }}
                  >
                    <Col span={FormItemDetailSpan} offset={FormItemLayoutOffset}>
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
                    <Col span={FormItemDetailSpan} offset={FormItemLayoutOffset}>
                      <Form.Item
                        {...field}
                        label="描述"
                        name={[field.name, 'desc']}
                        fieldKey={[field.fieldKey, 'desc']}
                        rules={[{ required: true, message: '请输入描述' }]}
                      >
                        <Input placeholder={'请输入描述'} />
                      </Form.Item>
                    </Col>
                    <Col span={FormItemDetailSpan} offset={FormItemLayoutOffset}>
                      <Form.Item
                        {...field}
                        label="图标"
                        name={[field.name, 'icon']}
                        fieldKey={[field.fieldKey, 'icon']}
                        rules={[{ required: true, message: '请选择图标' }]}
                      >
                        <IconSelect data={scheduleIconConfig()} placeholder={'请选择类别'} />
                      </Form.Item>
                    </Col>
                    <Col span={FormItemDetailSpan} offset={FormItemLayoutOffset}>
                      <Form.Item
                        {...field}
                        label="具体时间"
                        name={[field.name, 'time']}
                        fieldKey={[field.fieldKey, 'time']}
                        rules={[{ required: true, message: '请选择时间' }]}
                      >
                        <Input placeholder={'请输入时间例如:11:30'} />
                      </Form.Item>
                    </Col>
                    <Col span={1} offset={FormItemLayoutOffset}>
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
                  <Row
                    gutter={FormRowLayoutSpan}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                      justifyContent: 'left',
                      flex: 1,
                    }}
                  >
                    <Form.Item
                      className={styles.actionRowWrapper}
                      {...field}
                      name={[field.name, 'pictures']}
                      fieldKey={[field.fieldKey, 'pictures']}
                      rules={[{ required: true, message: '请选择图片' }]}
                    >
                      <UploadComponent
                        showUploadList={true}
                        multiple={true}
                        label={'上传图片'}
                        max={100}
                      />
                    </Form.Item>
                  </Row>
                </div>
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
