/**
 *  Created by pw on 2020/10/12 10:52 下午.
 */
import React from 'react';
import { Rate } from 'antd';
import './index.less';

interface Props {
  label?: string;
}

export default function (props: Props) {
  const { label } = props;
  return (
    <div className="rate-wrapper">
      {label ? <div className="rate-title">{label}</div> : null}
      <Rate className="rate-content" />
    </div>
  );
}
