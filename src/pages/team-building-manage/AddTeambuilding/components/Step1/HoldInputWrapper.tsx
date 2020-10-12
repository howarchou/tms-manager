/**
 *  Created by pw on 2020/10/12 11:07 下午.
 */
import React from 'react';
import { InputNumber, Row } from 'antd';
import './HoldInputWrapper.less';

export default function () {
  return (
    <Row className="hold-input-wrapper">
      <InputNumber className="hold-inputnumber" placeholder="请输入最小人数" />
      <div className="divider">~</div>
      <InputNumber className="hold-inputnumber" placeholder="请输入最大人数" />
    </Row>
  );
}
