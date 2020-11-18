import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Space } from 'antd';
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

const { Option } = Select;
const { TimePicker } = DatePicker;

const fieldLabels = {
  title: '案例标题',
  name: '案例名称',
  people: '人数',
  day: '天数',
  distance: '车程',
  address: '地点',
};

interface FormadvancedformtwoProps {
  location?: any;
  submitting: boolean;
}

const GUTTER = 16;
const LG = 6;
const MD = 12;
const SM = 24;

const Formadvancedformtwo: FC<FormadvancedformtwoProps> = ({ submitting, location }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<API.Case>();
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
      form.setFieldsValue({ schedule: [{}] });
    }
  }, [id]);

  const onFinish = async (values: API.Case) => {
    const schedules = values.schedule?.map((schedule) => {
      return { ...schedule, time: moment(schedule.time).valueOf() };
    });
    values.date = moment(values.date).valueOf();
    if (schedules && schedules.length) {
      values.schedule = schedules;
    }
    console.log(values);
    await saveCase(values);
    history.push('/operation/case/list');
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer title={`${id ? `编辑${data?.name}` : '添加案例'}`}>
        <Card title="案例基本信息" className={styles.card} bordered={false}>
          <Row gutter={GUTTER}>
            <Col lg={LG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.title}
                name="title"
                rules={[{ required: true, message: '请输入案例标题' }]}
              >
                <Input placeholder="请输入案例标题" />
              </Form.Item>
            </Col>
            <Col lg={LG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.name}
                name="name"
                rules={[{ required: true, message: '请输入案例名称' }]}
              >
                <Input placeholder="请输入案例名称" />
              </Form.Item>
            </Col>
            <Col lg={LG} md={MD} sm={SM}>
              <Form.Item
                label={'团建日期'}
                name={'date'}
                rules={[{ required: true, message: '请团建日期' }]}
              >
                <DatePicker style={{ width: '100%' }} placeholder="请团建日期" />
              </Form.Item>
            </Col>
            <Col lg={LG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.people}
                name="people"
                rules={[{ required: true, message: '请输入团建人数' }]}
              >
                <Input placeholder="请输入团建人数" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={GUTTER}>
            <Col lg={LG} md={MD} sm={SM}>
              <Form.Item
                label={'团建城市'}
                name={'city'}
                rules={[{ required: true, message: '请选择团建城市' }]}
              >
                <Select placeholder="请选择团建城市">
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
            <Col lg={LG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.day}
                name="days"
                rules={[{ required: true, message: '请选择团建天数' }]}
              >
                <Select placeholder="请选择团建天数">
                  <Option value="1">1天</Option>
                  <Option value="2">2天</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={LG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.distance}
                name="distance"
                rules={[{ required: true, message: '请输入车程' }]}
              >
                <Input placeholder="请输入车程" />
              </Form.Item>
            </Col>
            <Col lg={LG} md={MD} sm={SM}>
              <Form.Item
                label={fieldLabels.address}
                name="address"
                rules={[{ required: true, message: '请输入地址' }]}
              >
                <Input placeholder="请输入地址" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="案例行程" className={styles.card} bordered={false}>
          <Form.List name={'schedule'}>
            {(fields, { add, remove }) => (
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
                          <TimePicker style={{ width: '100%' }} placeholder="请输入时间" />
                        </Form.Item>
                      </Col>
                      <Col lg={LG} md={MD} sm={SM}>
                        <Form.Item
                          label={'活动内容'}
                          name={[field.name, 'content']}
                          fieldKey={[field.fieldKey, 'content']}
                          rules={[{ required: true, message: '请输入活动内容' }]}
                        >
                          <Input placeholder="请输入活动内容" />
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
            )}
          </Form.List>
        </Card>
        <Card title="案例素材" className={styles.card} bordered={false}>
          <Form.Item
            label="案例封面"
            name="cover"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <UploadComponent />
          </Form.Item>
          <Form.Item
            label="案例头图(最多10张)"
            name="banners"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <UploadComponent multiple={true} max={10} showUploadList />
          </Form.Item>

          <Form.Item
            label="案例图片(最多10张)"
            name="photos"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <UploadComponent multiple={true} max={10} showUploadList />
          </Form.Item>
        </Card>
      </PageContainer>
      <FooterToolbar>
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['operationManageAndcaseAndformadvancedformtwo/submitAdvancedForm'],
}))(Formadvancedformtwo);
