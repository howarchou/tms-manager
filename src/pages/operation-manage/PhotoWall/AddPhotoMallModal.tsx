/**
 *  Created by pw on 2020/10/9 10:08 下午.
 */

/**
 *  Created by pw on 2020/10/9 10:08 下午.
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'antd';
import UploadComponent from '@/components/Upload';
import { API } from '@/services/API';
import { savePhotoWall } from '@/services/photoWall';

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
  onAdd: (data: API.PhotoWall) => void;
  data: API.PhotoWall;
  open: string;
}

const AddPhotoMall = (props: AddModalIF) => {
  const { data = { sort: 1 } as API.PhotoWall, open } = props;
  const [visible, setVisible] = useState(!!open);
  const [form] = Form.useForm();

  useEffect(() => {
    setVisible(!!open);
    form.setFieldsValue(data);
  }, [open]);

  const handleOk = async () => {
    const values = await form.validateFields();
    const promises = (values.cover as string[]).map((url) => {
      return savePhotoWall({
        name: values.name || '图片',
        sort: 1,
        cover: url,
        status: data?.status || 0,
        id: data?.id,
      } as API.PhotoWall);
    });
    await Promise.all(promises);
    props.onAdd({} as any);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        批量新增
      </Button>
      <Modal width={600} title="批量新增" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form<API.PhotoWall>
          {...formItemLayout}
          form={form}
          name="addPhotoWall"
          initialValues={{ ...data }}
          scrollToFirstError
        >
          <Form.Item
            name="cover"
            label="图片上传"
            rules={[
              {
                required: false,
                message: '请上传图片',
              },
            ]}
          >
            <UploadComponent showUploadList={true} max={9} multiple={true} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default (props: AddModalIF) => <AddPhotoMall {...props} />;
