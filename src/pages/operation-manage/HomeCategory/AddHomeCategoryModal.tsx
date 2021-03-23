/**
 *  Created by pw on 2020/10/9 10:08 下午.
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Modal, Select, Spin } from 'antd';
import { debounce } from 'lodash';
const { Option } = Select;
import { API } from '@/services/API';
import { saveHomeCategory } from '@/services/homeCategory';
import { typeIconConfig } from '@/helpers/config';
import { IconSelect } from '@/pages/team-building-manage/AddTeambuilding/components/IconSelect';
import { getActivities } from '@/services/activity';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

interface AddModalIF {
  onAdd: (data: API.Home_Category) => void;
  data: API.Home_Category;
  open: string;
}

const AddHomeCategoryModal = (props: AddModalIF) => {
  const { open } = props;
  const [data, setData] = useState<API.Home_Category>(
    props.data || ({ sort: 1 } as API.Home_Category),
  );
  const [visible, setVisible] = useState(!!open);
  const [form] = Form.useForm();

  useEffect(() => {
    setData(props?.data);
    setVisible(!!open);
    form.setFieldsValue(props?.data);
  }, [open + data?.id]);

  const handleAdd = () => {
    setData({ id: undefined } as API.Home_Category);
    form.setFieldsValue({ type_id: undefined, activity_id: undefined, sort: undefined });
    setVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values);
    const results = await saveHomeCategory({
      ...values,
      status: data?.status || 0,
      id: data?.id,
    } as API.Home_Category);
    props.onAdd(results);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={handleAdd}>
        新增
      </Button>
      <Modal width={600} title="添加" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form<API.Home_Category>
          {...formItemLayout}
          form={form}
          name="addCategory"
          initialValues={{ ...data }}
          scrollToFirstError
        >
          <Form.Item
            name="activity_id"
            label="关联团建"
            rules={[
              {
                required: true,
                message: '请选择关联团建',
              },
            ]}
          >
            <ActivitySelect categoryId={data?.id} />
          </Form.Item>
          <Form.Item
            name="sort"
            label="排序"
            rules={[
              {
                required: true,
                message: '请输入排序',
              },
              {
                type: 'number',
                message: '请输入数字',
              },
            ]}
          >
            <InputNumber placeholder={'排序'} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

interface Props {
  onChange?: (value: string) => void;
  value?: string;
  categoryId: number | undefined;
}

const ActivitySelect = (props: Props) => {
  const { onChange, categoryId, value: defalueValue } = props;
  const [data, setData] = useState<API.TeamBuildingNew[]>([]);
  const [value, setValue] = useState<any>(defalueValue ? { value: defalueValue } : undefined);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  const fetchData = debounce(async () => {
    setFetching(true);
    const list = await getActivities({ page_no: 1, page_size: 9999 });
    setData(list.data);
    setFetching(false);
  }, 800);

  const handleChange = (value: any) => {
    setValue(value);
    setData([]);
    setFetching(false);
    if (onChange) {
      onChange(value?.value);
    }
  };

  return (
    <Select
      labelInValue
      value={value}
      placeholder="请选择团建"
      notFoundContent={fetching ? <Spin size="small" /> : null}
      filterOption={false}
      // onSearch={fetchData}
      onChange={handleChange}
      style={{ width: '100%' }}
    >
      {data.map((d) => (
        <Option key={d.id} value={d.id!!}>
          {d.name}
        </Option>
      ))}
    </Select>
  );
};

export default (props: AddModalIF) => <AddHomeCategoryModal {...props} />;
