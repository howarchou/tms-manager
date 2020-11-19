/**
 *  Created by pw on 2020/11/19 8:19 下午.
 */
import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history } from 'umi';

interface Props {
  title: string;
  onBackClick?: () => void;
}

const noop = () => {};

export default function (props: Props) {
  const { title = '', onBackClick = noop } = props;

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      history.goBack();
    }
  };

  return (
    <>
      <ArrowLeftOutlined onClick={handleBackClick} style={{ marginRight: 8 }} />
      {title}
    </>
  );
}
