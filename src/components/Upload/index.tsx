/**
 *  Created by pw on 2020/10/9 10:29 下午.
 */
import React, { useEffect, useState } from 'react';
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { customSetting } from '../../../config/defaultSettings';

function beforeUpload(file: Blob) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt20M = file.size / 1024 / 1024 < 20;
  if (!isLt20M) {
    message.error('Image must smaller than 20MB!');
  }
  return isJpgOrPng && isLt20M;
}

interface Props {
  onChange?: (value: string | string[]) => void;
  value?: string | string[];
  showUploadList?: boolean;
  multiple?: boolean;
  max?: number;
}

export default function (props: Props) {
  const { showUploadList = false, multiple = false, max = 1 } = props;
  const [loading, setLoading] = useState(false);
  const defaultImageUrls = props?.value || showUploadList ? [] : '';
  const [imageUrls, setImageUrls] = useState<string | string[]>(defaultImageUrls);

  useEffect(() => {
    if (props?.value) {
      if (showUploadList) {
        const imgs = (imageUrls as string[]).map((url) => {
          return !!~url?.indexOf(customSetting.globalFileUrl)
            ? url
            : `${customSetting.globalFileUrl}${url}`;
        });
        setImageUrls(imgs as string[]);
      } else {
        const imgUrl = !!~props?.value?.indexOf(customSetting.globalFileUrl)
          ? props?.value
          : `${customSetting.globalFileUrl}${props?.value}`;
        setImageUrls(imgUrl);
      }
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
      let data: any;
      if (showUploadList) {
        (imageUrls as string[]).push(payload);
        data = imageUrls?.slice();
        setImageUrls(data);
      } else {
        data = `${customSetting.globalFileUrl}${payload}`;
        setImageUrls(data);
      }
      if (props.onChange) {
        props.onChange(data);
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const PhotoList = () => {
    return <>{imageUrls.length < max ? uploadButton : null}</>;
  };

  const SinglePhoto = () => {
    return (
      <>
        {imageUrls ? (
          <img src={imageUrls as string} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </>
    );
  };

  return (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={showUploadList}
      action="http://tms.cicisoft.cn/api/upload"
      multiple={multiple}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {showUploadList ? <PhotoList /> : <SinglePhoto />}
    </Upload>
  );
}
