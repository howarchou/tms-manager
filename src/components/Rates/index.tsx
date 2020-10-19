/**
 *  Created by pw on 2020/10/12 10:52 下午.
 */
import React from 'react';
import { Rate } from 'antd';
import './index.less';

interface Props {
  label?: string;
  value?: number;
  className?: string;
  disabled?: boolean;
}

export default function (props: Props) {
  const { label, value, className = '', disabled = false } = props;
  return (
    <div className="rate-wrapper">
      {label ? <div className="rate-title">{label}</div> : null}
      <Rate className={`rate-content ${className}`} value={value} disabled={disabled} />
    </div>
  );
}
