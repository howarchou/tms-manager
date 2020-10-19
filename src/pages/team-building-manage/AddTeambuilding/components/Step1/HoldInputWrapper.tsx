/**
 *  Created by pw on 2020/10/12 11:07 下午.
 */
import React from 'react';
import { InputNumber, Row } from 'antd';
import './HoldInputWrapper.less';

interface HoldInputValue {
  hold_max: number;
  hold_min: number;
}

interface Props {
  onChange?: (value: HoldInputValue) => void;
  value?: HoldInputValue;
}

export default function (props: Props) {
  const { onChange, value } = props;

  const handleChange = (key: string, changeValue: number) => {
    onChange && onChange({ ...value, [key]: changeValue } as HoldInputValue);
  };

  return (
    <Row className="hold-input-wrapper">
      <InputNumber
        className="hold-inputnumber"
        placeholder="请输入最小人数"
        value={value?.hold_min}
        onChange={(value) => handleChange('hold_min', value as number)}
      />
      <div className="divider">~</div>
      <InputNumber
        className="hold-inputnumber"
        placeholder="请输入最大人数"
        value={value?.hold_max}
        onChange={(value) => handleChange('hold_max', value as number)}
      />
    </Row>
  );
}
