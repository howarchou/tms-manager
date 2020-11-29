/**
 *  Created by pw on 2020/10/9 10:29 下午.
 */
import React, { useEffect, useState } from 'react';
import { message, Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload/interface';
import { customSetting } from '../../../config/defaultSettings';
import { UploadFile } from 'antd/es/upload/interface';

interface Props {
  label?: string;
  value?: string | string[];
  showUploadList?: boolean;
  multiple?: boolean;
  max?: number;
  onChange?: (value: string | string[]) => void;
}

export default function (props: Props) {
  const { showUploadList = false, multiple = false, max = 1, label = '上传' } = props;
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();

  useEffect(() => {
    if (props?.value) {
      const data = Array.isArray(props?.value) ? props.value : [props?.value];
      const list: any = data.map((url, index) => {
        const imgUrl = !!~url?.indexOf(customSetting.globalFileUrl)
          ? url
          : `${customSetting.globalFileUrl}${url}`;
        return { url: imgUrl, name: 'image.png', uid: url + index };
      });
      setFileList(list);
    }
  }, [props?.value]);

  const handleBeforeUpload = (file: Blob, files: RcFile[]) => {
    if (fileList.length === max) {
      return false;
    }
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error('Image must smaller than 20MB!');
    }
    return isJpgOrPng && isLt20M;
  };

  const handleChange = (info: UploadChangeParam) => {
    setFileList(info.fileList);
    if (info.file.status === 'error') {
      setLoading(false);
      return;
    }
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      fnUpdateData(info.fileList);
    }
  };

  const fnUpdateData = (fileList: UploadFile[]) => {
    const data = fileList.map((file) => {
      if (file?.response?.payload) {
        return file?.response?.payload;
      }
      return file?.url?.split('/')?.pop();
    });
    if (props.onChange) {
      if (multiple) {
        props.onChange(data);
      } else {
        props.onChange(data[0]);
      }
    }
  };

  const handlePreview = (file: UploadFile) => {
    setPreviewVisible(true);
    setPreviewImage(file.url);
  };

  const handleRemove = (file: UploadFile) => {
    const data = fileList.filter((line) => line.uid !== file.uid);
    setFileList(data);
    fnUpdateData(data);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{label}</div>
    </div>
  );

  const PhotoList = () => {
    return <>{uploadButton}</>;
  };

  const SinglePhoto = () => {
    const [file] = fileList || [];
    return (
      <>
        {file?.url ? <img src={file.url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </>
    );
  };

  return (
    <>
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={showUploadList}
        action={UploadUrl()}
        multiple={multiple}
        fileList={fileList}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={handleRemove}
      >
        {showUploadList ? fileList.length >= max ? null : <PhotoList /> : <SinglePhoto />}
      </Upload>
      <Modal visible={previewVisible} title={'预览图片'} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}

const UploadUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return location.origin + '/api/upload';
  }
  return 'http://tms.cicisoft.cn/api/upload';
};
