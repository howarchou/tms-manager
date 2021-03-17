import { Button, Card, Col, DatePicker, Form, Input, InputNumber, message, Row, Select, Space } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './style.less';
import UploadComponent from '@/components/Upload';
import { API } from '@/services/API';
import moment from 'moment';
import { saveCase, getCaseById } from '@/services/case';
import { history } from 'umi';
import { caseCityConfig } from '@/helpers/config';
import HeaderBack from '@/components/HeaderBack';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { uuid } from '@/helpers';

const { Option } = Select;
const { TimePicker } = DatePicker;

const fieldLabels = {
  title: '案例标题',
  name: '案例名称',
  people: '人数',
  day: '天数',
  distance: '车程',
  address: '地点',
  company: '公司名称',
  view: '浏览数',
};

interface FormadvancedformtwoProps {
  location?: any;
  submitting: boolean;
}

const GUTTER = 16;
const LG = 6;
const DLG = 4;
const NLG = 2;
const MD = 12;
const SM = 24;

const Formadvancedformtwo: FC<FormadvancedformtwoProps> = ({ submitting, location }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<API.Case>();
  const [listFrom, setListFrom] = useState<FormInstance[]>([]);
  const id = location?.query?.id;
  useEffect(() => {
    if (id) {
      getCaseById(id).then((res) => {
        const data: any = { ...res, date: moment(res.date) };
        data.schedule = data.schedule?.map((schedule: any) => {
          return { ...schedule, time: moment(schedule.time) };
        });
        setData(data);
        form.setFieldsValue(data);
      });
    } else {
      form.setFieldsValue({ schedule: [{ items: [{}] }] });
    }
  }, [id]);

  const onFinish = async (values: any) => {
    console.log(values);
    const schedulePromises = listFrom.map(async (form) => {
      const schedule = await form.getFieldsValue();
      return schedule.scheduleItems.map((item: API.Case_Schedule_Item) => {
        return { ...item, time: moment(item.time).valueOf() };
      });
    });
    const scheduleItems = await Promise.all(schedulePromises);
    const schedules = values.schedule?.map((schedule: any, index: number) => {
      const items = scheduleItems[index];
      return { ...schedule, items, day: index + 1 };
    });
    values.date = moment(values.date).valueOf();
    if (schedules && schedules.length) {
      values.schedule = schedules;
    }
    await saveCase({ ...values, id });
    history.push('/operation/case/list');
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  const handleLeftClick = () => {
    history.push('/operation/case/list');
  };

  const handleListFrom = (key: string, form: FormInstance) => {
    listFrom.push(form);
    setListFrom(listFrom.slice());
  };

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer
        title={
          <HeaderBack title={id ? `编辑${data?.name}` : '添加案例'} onBackClick={handleLeftClick} />
        }
      >
        <Card title='案例基本信息' className={styles.card} bordered={false}>
          <Row gutter={GUTTER}>
            <Col lg={LG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.title}
                name='title'
                rules={[{ required: true, message: '请输入案例标题' }]}
              >
                <Input placeholder='请输入案例标题' />
              </Form.Item>
            </Col>
            <Col lg={LG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.company}
                name='company'
                rules={[{ required: true, message: '请输入公司名字' }]}
              >
                <Input placeholder='请输入案例标题' />
              </Form.Item>
            </Col>
            <Col lg={LG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.name}
                name='name'
                rules={[{ required: true, message: '请输入案例名称' }]}
              >
                <Input placeholder='请输入案例名称' />
              </Form.Item>
            </Col>
            <Col lg={DLG} md={MD} sm={SM}>
              <Form.Item
                label={'团建日期'}
                name={'date'}
                rules={[{ required: true, message: '请团建日期' }]}
              >
                <DatePicker style={{ width: '100%' }} placeholder='请团建日期' />
              </Form.Item>
            </Col>
            <Col lg={NLG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.people}
                name='people'
                rules={[{ required: true, message: '请输入团建人数' }]}
              >
                <InputNumber placeholder='人数' min={1} max={99999} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={GUTTER}>
            <Col lg={DLG} md={MD} sm={SM}>
              <Form.Item
                label={'团建城市'}
                name={'city'}
                rules={[{ required: true, message: '请选择团建城市' }]}
              >
                <Select placeholder='请选择团建城市'>
                  {caseCityConfig().map((area) => {
                    return (
                      <Option key={area.value} value={area.value}>
                        {area.text}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={NLG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.day}
                name='days'
                rules={[{ required: true, message: '请输入团建天数' }]}
              >
                <InputNumber placeholder='天数' min={1} max={999} />
              </Form.Item>
            </Col>
            <Col lg={NLG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.distance}
                name='distance'
                rules={[{ required: true, message: '请输入车程' }]}
              >
                <Input placeholder='车程' />
              </Form.Item>
            </Col>
            <Col lg={2*LG + 2} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.address}
                name='address'
                rules={[{ required: true, message: '请输入地址' }]}
              >
                <Input placeholder='请输入地址' />
              </Form.Item>
            </Col>
            <Col lg={NLG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.view}
                name='views'
                rules={[{ required: true, message: '请输入浏览量' }]}
              >
                <InputNumber placeholder='浏览' min={0} max={99999999999} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title='案例行程' className={styles.card} bordered={false}>
          <Form.List name={'schedule'}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => {
                  const scheduleItem = data?.schedule ? data?.schedule[index] : undefined;
                  return (
                    <Card
                      style={{ marginBottom: 10 }}
                      title={`第${index + 1}天`}
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
                      <FormItemList
                        uuidKey={uuid(8)}
                        onUpdateFrom={handleListFrom}
                        value={scheduleItem?.items}
                      />
                    </Card>
                  );
                })}
              </>
            )}
          </Form.List>
        </Card>
        <Card title='案例素材' className={styles.card} bordered={false}>
          <Form.Item
            label='案例Logo'
            name='logo'
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <UploadComponent />
          </Form.Item>
          <Form.Item
            label='案例封面'
            name='cover'
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <UploadComponent />
          </Form.Item>
          <Form.Item
            label='案例头图'
            name='banner'
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <UploadComponent />
          </Form.Item>

          <Form.Item
            label='案例图片(多张)'
            name='photos'
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <UploadComponent multiple={true} max={1000} showUploadList />
          </Form.Item>
        </Card>
      </PageContainer>
      <FooterToolbar>
        <Button type='primary' onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

interface FormItemListProps {
  uuidKey: string;
  value?: API.Case_Schedule_Item[];
  onUpdateFrom: (key: string, form: FormInstance) => void;
}

const FormItemList = (props: FormItemListProps) => {
  const { uuidKey, onUpdateFrom, value } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    const scheduleItems = value
      ? value.map((item) => {
        return { ...item, time: moment(item.time) };
      })
      : [{}];
    form.setFieldsValue({ scheduleItems });
    onUpdateFrom(uuidKey, form);
  }, []);

  return (
    <Form
      style={{ height: '100%' }}
      name={'scheduleItems'}
      form={form}
      layout='vertical'
      autoComplete='off'
    >
      <Form.List name={'scheduleItems'}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => {
                return (
                  <Row key={field.name} gutter={GUTTER}>
                    <Col lg={LG} md={MD} sm={SM}>
                      <Form.Item
                        label={'时间'}
                        name={[field.name, 'time']}
                        fieldKey={[field.fieldKey, 'time']}
                        rules={[{ required: true, message: '请输入时间' }]}
                      >
                        <TimePicker
                          style={{ width: '100%' }}
                          placeholder='请输入时间'
                          format='HH:mm'
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={LG} md={MD} sm={SM}>
                      <Form.Item
                        label={'活动内容'}
                        name={[field.name, 'text']}
                        fieldKey={[field.fieldKey, 'text']}
                        rules={[{ required: true, message: '请输入活动内容' }]}
                      >
                        <Input placeholder='请输入活动内容' />
                      </Form.Item>
                    </Col>
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
                  </Row>
                );
              })}
            </>
          );
        }}
      </Form.List>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['operationManageAndcaseAndformadvancedformtwo/submitAdvancedForm'],
}))(Formadvancedformtwo);
