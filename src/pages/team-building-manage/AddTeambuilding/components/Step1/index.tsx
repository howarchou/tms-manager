import React, { useEffect, useRef } from 'react';
import { Form, Button, Input, Select, Row, Col, Space, InputNumber } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import styles from './index.less';
import type { StateType } from '../../model';
import UploadComponent from '@/components/Upload';
import { RateGroup } from '@/components/Rates';
import type { Key } from 'rc-select/lib/interface/generator';

import {
  activityTypeConfig,
  areaConfig,
  durationConfig,
  getDefaultValue,
  methodConfig,
  profitConfig,
  starConfig
} from '@/helpers/config';
import { saveActivity } from "@/services/activity";
import { history } from "@@/core/history";

const {Option, OptGroup} = Select;
const {TextArea} = Input;

interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}

const FormItemLayoutSpan = 4;
const FormItemLayoutOffset = 0;
const FormRowLayoutSpan = 12;

const Step1: React.FC<Step1Props> = (props) => {

  const {dispatch, data = getDefaultValue(), submitting} = props;
  const selectRef = useRef<HTMLScriptElement>(null);
  const isCopy = history.location?.query?.copy === '1';
  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        hold_people: {hold_min: data?.hold_min, hold_max: data?.hold_max}
      });
    }
  }, [data, data.id, form]);

  useEffect(() => {
    if (isCopy) {
      selectRef.current?.focus();
    }
  }, []);

  if (!data) {
    return null;
  }


  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: {}
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'notice'
      });

    }
  };


  const onValidateForm = async (flag?: string) => {
    const values = await form.validateFields();
    // const values = await getFieldsValue();
    if (dispatch) {
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: values
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'place'
      });

      if (isCopy && 'submit' === flag) {
        if (data?.id === undefined || data?.id === 0) {
          data.status = 0;
        }
        const params: any = {
          ...data,
          ...values
        };
        const result = await saveActivity(params);
        if (result) {
          history.push({
            pathname: '/team-building/list'
          });
          onFinish();
        }
      }

    }
  };

  return (
    <>
      <Form
        className={styles.stepForm}
        form={form}
        layout='vertical'
        initialValues={data}
      >
        <Row gutter={FormRowLayoutSpan}>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label='团建名称'
              name='name'
              rules={[{required: true, message: '请输入团建名称'}]}
            >
              <Input placeholder='请输入团建名称'/>
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label='团建天数'
              name='duration'
              rules={[{required: true, message: '请选择团建天数'}]}
            >
              <Select placeholder={'请选择团建天数'}>
                {durationConfig().map((area) => {
                  return (
                    <Option key={area.value} value={area.value}>
                      {area.text}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label='活动人数'
              name='people_number'
              rules={[{required: true, message: '请输入活动人数'}]}
            >
              <InputNumber placeholder={'请输入活动人数'} min={1} style={{width: '100%'}}/>
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item label='类别' name='type' rules={[{required: true, message: '请选择类别'}]}>
              <Select placeholder={'请选择类别'}>
                {activityTypeConfig().map((type) => {
                    return (
                      <OptGroup label={type.text}>
                        {
                          type.items?.map((icon: { value: Key | undefined; icon: string | undefined; text: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; }) => {
                            return (
                              <Select.Option key={icon.value} value={icon.value ?? 0}>
                                {
                                  <div style={{display: 'flex', alignItems: 'center'}}>
                                    <img src={icon.icon} style={{marginRight: 8, width: 10, height: 12}} alt={'图标'}/>
                                    {icon.text}
                                  </div>
                                }
                              </Select.Option>
                            );
                          })
                        }
                      </OptGroup>
                    );
                  }
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label='团建玩法'
              name='method'
              rules={[{required: true, message: '请选择团建玩法'}]}
            >
              <Select placeholder={'请选择团建玩法'}>
                {methodConfig().map((area) => {
                  return (
                    <Option key={area.value} value={area.value}>
                      {area.text}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={FormRowLayoutSpan}>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label='活动地区'
              name='area'
              rules={[{required: true, message: '请选择活动地区'}]}
            >
              <Select placeholder={'请选择活动地区'} ref={selectRef}>
                {areaConfig().map((province) => {
                    return (
                      <OptGroup key={'activity-area'} label={province.text}>
                        {
                          province.items?.map((area) => {
                            return (
                              <Option key={area.value} value={area.value}>
                                {area.text}
                              </Option>
                            );
                          })
                        }
                      </OptGroup>
                    );
                  }
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={2 * FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label='详细地址'
              name='address'
              rules={[{required: true, message: '请输入详细地址'}]}
            >
              <Input placeholder='请输入详细地址'/>
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label='团建策划师'
              name='planner'
              rules={[{required: true, message: '请输入团建策划师'}]}
            >
              <Input placeholder='团建策划师'/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={2 * FormRowLayoutSpan}>
          <Col span={4 * FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label='团建收益'
              name='profits'
              rules={[{required: true, message: '请选择团建收益'}]}
            >
              <Select mode={'multiple'} placeholder={'请选择团建收益'}>
                {profitConfig().map((area) => {
                  return (
                    <Option key={area.value} value={area.value}>
                      {area.text}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={FormItemLayoutSpan} offset={FormItemLayoutOffset}>
            <Form.Item
              label='排序'
              name='sort'
              rules={[{required: true, message: '请输入排序'}]}
            >
              <InputNumber placeholder={'请输入排序'} style={{width: '100%'}} min={0} max={99999}/>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label='封面图' name='cover' rules={[{required: true, message: '请上传封面'}]}>
          <UploadComponent/>
        </Form.Item>

        <Form.Item label='策划者头像' name='avatar' rules={[{message: '请上传策划者头像'}]}>
          <UploadComponent/>
        </Form.Item>

        <Row gutter={FormRowLayoutSpan}>
          <Col span={8} offset={FormItemLayoutOffset}>
            <Form.Item
              label='活动特色'
              name='description'
              rules={[{required: true, message: '请输入活动特色'}]}
            >
              <TextArea placeholder='活动特色' autoSize={{minRows: 3, maxRows: 5}}/>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label='推荐指数'
          name='stars'
          rules={[{required: true, message: '请输入推荐指数'}]}
        >
          <RateGroup rates={starConfig()}/>
        </Form.Item>
        <Space
          style={{
            marginTop: 40,
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'center',
            flex: 1
          }}
          align={'baseline'}
        >
          <Form.Item>
            <Button onClick={()=>onValidateForm()}>
              下一步
            </Button>
            {
              isCopy && <Button type='primary' onClick={() => onValidateForm('submit')} loading={submitting} style={{marginLeft: 8}}>
                提交
              </Button>
            }
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default connect(({addteambuilding, loading}: {
  addteambuilding: StateType;
  loading: {
    effects: Record<string, boolean>;
  }
}) => ({
  data: addteambuilding.step,
  submitting: loading.effects['addteambuilding/submitStepForm']
}))(Step1);
