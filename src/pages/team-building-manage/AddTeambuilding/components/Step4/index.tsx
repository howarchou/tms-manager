import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Space,
  Row,
  Col,
  Input,
  InputNumber,
  Card,
  Descriptions,
  Select
} from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface Step4Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}

const {TextArea} = Input;
const FormItemLayoutOffset = 0;

const FileldsNameArray = {
  道具: '活动专用道具、道具运输、道具损耗',
  拓展: '活动专用教练',
  领队: '专业活动领队，三方服务对接',
  桌餐: '10人/桌，不含酒水',
  交通: '往返大巴车，过桥费，司机餐补',
  横幅: '企业定制专用横幅',
  饮水: '每人每天两瓶',
  保险: '50W高额医疗保险',
  门票: '景区门票每人一张',
  场地: '拓展活动专用场地',
  住宿: '双人标间，含双早',
  赠送: '活动气氛香槟、奖杯'
};

const PeopleNum: FC<{ num: number, onChange?: (num: number | string | undefined) => void }> = ({
                                                                                                 num: nums,
                                                                                                 onChange
                                                                                               }) => {
  return (
    <Row align="middle">
      <span style={{marginRight: 10}}>人数:</span>
      <InputNumber
        value={nums}
        placeholder={'人数'}
        onChange={onChange}
      />
    </Row>
  );
};


const Step4: React.FC<Step4Props> = (props) => {
  const {data, dispatch, submitting} = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...data
    });
  }, [data]);

  const SCALE = 2;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [num, setNum] = useState<number>(1);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sum, setSum] = useState(0);
  const [cost, setCost] = useState(0);
  const {getFieldsValue, setFieldsValue} = form;

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: {
          ...data,
          ...values
        }
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'schedule'
      });
    }
  };
  const onValidateForm = async () => {
    const values = await form.validateFields();
    // const values = await getFieldsValue();
    if (dispatch) {
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: values
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'notice'
      });
    }
  };

  const handleTotalPrice = () => {
    const value = form.getFieldsValue();
    const {fee} = value;
    let sumTemp = 0;
    let countTemp = 0;
    if (fee && fee.length) {
      const calFee = fee.map(
        (feeItem: { days: number; price: number; num: number; total_price: any, cost_price: any }) => {
          if (feeItem === undefined) return feeItem;
          if (
            Number.isNaN(feeItem?.days) ||
            Number.isNaN(feeItem?.price) ||
            Number.isNaN(feeItem?.num)
          ) {
            return feeItem;
          }
          // eslint-disable-next-line no-param-reassign
          feeItem.total_price = feeItem.days * feeItem.price * feeItem.num;
          countTemp += feeItem.days * feeItem.cost_price * feeItem.num;
          sumTemp += feeItem.total_price;
          return {...feeItem};
        }
      );
      form.setFieldsValue({fee: calFee});
    }
    setSum(sumTemp);
    setCost(countTemp);
  };


  const handleChange = (value: string, index: number) => {
    const fileds = form.getFieldsValue();
    const {fee} = fileds;
    if (FileldsNameArray[value]) fee[index].intro = FileldsNameArray[value];
    setFieldsValue({
      fee: [...fee]
    });
  };

  useEffect(() => {
    handleTotalPrice();
  }, [num]);

  const handleChangeNum = (v: number | string | undefined) => {
    if (typeof v === 'number' || typeof v === 'string') {
      setNum(v as number);
    }
  };
  if (!data) {
    return null;
  }

  return (
    <>
      <Form
        style={{height: '100%', marginTop: 40}}
        name={'plan'}
        form={form}
        layout="horizontal"
        autoComplete="off"
        initialValues={data}
      >
        <Card style={{marginBottom: 10}}>
          <Descriptions title={'统计信息'} column={5} extra={<PeopleNum num={num as number} onChange={handleChangeNum}/>}>
            <Descriptions.Item label={'总计'}>{Number(sum).toFixed(SCALE)}</Descriptions.Item>
            <Descriptions.Item label={'含税'}>
              {Number(sum * Number(1 + 0.26)).toFixed(SCALE)}
            </Descriptions.Item>
            <Descriptions.Item label={'税率'}>{'6.00%'}</Descriptions.Item>
            <Descriptions.Item label={'利润'}>{Number(sum - cost).toFixed(SCALE)}</Descriptions.Item>
            <Descriptions.Item label={'人均'}>
              {num ? Number(sum / num).toFixed(SCALE) : '0.00'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Form.List name="fee">
          {(fields, {add, remove}) => (
            <>
              {fields.map((field, fieldNum) => (
                <Space
                  key={field.key}
                  style={{
                    display: 'flex',
                    marginTop: 20,
                    marginBottom: 8
                  }}
                  align="center"
                >
                  <Form.Item
                    {...field}
                    label={'项目:'}
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                    rules={[{required: true, message: '请填写项目'}]}
                  >
                    {/*<Input placeholder="项目"/>*/}

                    <Select
                      placeholder="项目"
                      onChange={(value) => {
                        handleChange(value as string, fieldNum);
                      }}
                    >
                      {Object.keys(FileldsNameArray).map((item, index) => {
                        return (
                          <Select.Option value={item} key={index}>
                            {item}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={'描述:'}
                    name={[field.name, 'intro']}
                    fieldKey={[field.fieldKey, 'intro']}
                    rules={[{required: true, message: '请填写描述'}]}
                    style={{width: 420}}
                  >
                    <Input placeholder="描述"/>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={'优惠价:'}
                    name={[field.name, 'price']}
                    fieldKey={[field.fieldKey, 'price']}
                    rules={[{required: true, message: '请填写价格', type: 'number'}]}
                  >
                    <InputNumber placeholder="优惠价" onChange={handleTotalPrice}/>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={'成本价:'}
                    name={[field.name, 'cost_price']}
                    fieldKey={[field.fieldKey, 'cost_price']}
                    rules={[{required: true, message: '请填写优惠价', type: 'number'}]}
                  >
                    <InputNumber placeholder="成本价"/>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={'数量:'}
                    name={[field.name, 'num']}
                    fieldKey={[field.fieldKey, 'num']}
                    rules={[{required: true, message: '请填写数量', type: 'number'}]}
                  >
                    <InputNumber placeholder="数量" onChange={handleTotalPrice}/>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={'天数:'}
                    name={[field.name, 'days']}
                    fieldKey={[field.fieldKey, 'days']}
                    rules={[{required: true, message: '请填写天数', type: 'number'}]}
                  >
                    <InputNumber placeholder="天数" onChange={handleTotalPrice}/>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={'总价:'}
                    name={[field.name, 'total_price']}
                    fieldKey={[field.fieldKey, 'total_price']}
                    rules={[{required: true, message: '请填写总价', type: 'number'}]}
                  >
                    <InputNumber disabled={true} placeholder="总价"/>
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                      handleTotalPrice();
                    }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Row justify="space-around" align={'middle'}>
                  <Col span={6}>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                      添加项目
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Row>
          <Col span={6} offset={FormItemLayoutOffset}>
            <Form.Item
              label="单价"
              name="price"
              rules={[
                {required: true, message: '请输入单价'},
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入合法金额数字'
                }
              ]}
            >
              <InputNumber style={{width: '100%'}} placeholder="单价"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={FormItemLayoutOffset}>
            <Form.Item
              label="不包含"
              name="cost_statement"
              rules={[{required: true, message: '请输入不包含说明'}]}
            >
              <TextArea placeholder="费用不包含说明" autoSize={{minRows: 3, maxRows: 5}}/>
            </Form.Item>
          </Col>
        </Row>
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
          <Button onClick={onPrev} style={{marginRight: 8}}>
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
     loading
   }: {
    addteambuilding: StateType;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    submitting: loading.effects['addteambuilding/submitStepForm'],
    data: addteambuilding.step
  })
)(Step4);
