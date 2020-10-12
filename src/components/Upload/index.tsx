/**
 *  Created by pw on 2020/10/9 10:29 下午.
 */
import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { customSetting } from '../../../config/defaultSettings';

function beforeUpload(file: Blob) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

interface Props {
  onChange?: (value: string) => void;
  value?: string;
}

export default function (props: Props) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(props?.value);

  useEffect(() => {
    if (props?.value) {
      const imgUrl = !!~props?.value?.indexOf(customSetting.globalFileUrl)
        ? props?.value
        : `${customSetting.globalFileUrl}${props?.value}`;
      setImageUrl(imgUrl);
    }
  }, [props?.value]);

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'error') {
      setLoading(false);
      return;
    }
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const payload = info.file.response.payload;
      setLoading(false);
      setImageUrl(`${customSetting.globalFileUrl}${payload}`);
      if (props.onChange) {
        props.onChange(payload);
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="http://tms.cicisoft.cn/api/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
}
