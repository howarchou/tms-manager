import React, { useState, useEffect } from 'react';
import { Form, Button, Space, Row, Col, message, Card, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

import { FormInstance } from 'antd/lib/form/hooks/useForm';
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
  useEffect(() => {
    form.setFieldsValue({ ...data, schedule: data?.schedule ?? [{ items: [{}] }] });
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
        payload: 'place',
      });
    }
  };
  const onValidateForm = async () => {
    // const values = await getFieldsValue();
    const values = await form.validateFields()

    if (dispatch) {
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

  return (
    <Form
      style={{ height: '100%', marginTop: 40 }}
      form={form}
      layout='vertical'
      autoComplete='off'
      initialValues={data}
    >
      <Form.List name={'schedule'}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => {
              return (
                <Card
                  key={field.key}
                  title={`第${index + 1}天`}
                  style={{ marginTop: 20 }}
                  extra={
                    <Space align={'center'}>
                      <PlusOutlined onClick={() => add({'items':[{}]}, index + 1)} />
                      <MinusCircleOutlined
                        onClick={() => {
                          if (fields.length !== 1) {
                            remove(field.name);
                            listFrom.splice(field.name, 1);
                            setListFrom(listFrom.slice());
                          } else {
                            message.warning('至少保留一个').then(() => {
                            });
                          }
                        }}
                      />
                    </Space>
                  }
                >
                  <Card
                    type='inner'
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
                            label='行程标题'
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
                            label='图标'
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
                    <Col>
                      <Form.List name={[field.name, 'items']}>
                        {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                        {(fields, { add, remove }) => {
                          return (
                            <>
                              {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                              {fields.map((field, index) => (
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
                                        label='标题'
                                        name={[field.name, 'title']}
                                        fieldKey={[field.fieldKey, 'title']}
                                      >
                                        <Input placeholder={'请输入标题'} />
                                      </Form.Item>
                                    </Col>
                                    <Col span={FormItemDetailSpan} offset={FormItemLayoutOffset}>
                                      <Form.Item
                                        {...field}
                                        label='描述'
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
                                        label='图标'
                                        name={[field.name, 'icon']}
                                        fieldKey={[field.fieldKey, 'icon']}
                                      >
                                        <IconSelect data={scheduleIconConfig()} placeholder={'请选择类别'} />
                                      </Form.Item>
                                    </Col>
                                    <Col span={FormItemDetailSpan} offset={FormItemLayoutOffset}>
                                      <Form.Item
                                        {...field}
                                        label='具体时间'
                                        name={[field.name, 'time']}
                                        fieldKey={[field.fieldKey, 'time']}
                                      >
                                        <Input placeholder={'请输入时间例如:11:30'} />
                                      </Form.Item>
                                    </Col>
                                    <Col span={1} offset={FormItemLayoutOffset}>
                                      <Space className={styles.actionRow} align={'center'}>
                                        <PlusOutlined onClick={() => add({}, index + 1)} />
                                        <MinusCircleOutlined
                                          onClick={() => {
                                            if (fields.length !== 1) {
                                              remove(field.name);
                                            } else {
                                              message.warning('至少保留一个').then();
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
                    </Col>
                  </Card>
                </Card>
              );
            })
            }
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
          <Button type='primary' onClick={onValidateForm} loading={submitting}>
            下一步
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
)(Step3);
