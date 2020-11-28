/**
 *  Created by pw on 2020/11/28 3:50 下午.
 */
import React from 'react';
import { Select } from 'antd';

interface IconSelectData {
  value: number;
  icon: string;
  text: string;
}

interface IconSelectProps {
  data: IconSelectData[];
  placeholder?: string;
  onChange?: (value: number) => void;
  value?: any;
}

export const IconSelect = (props: IconSelectProps) => {
  const { data, placeholder = '请选择图标', onChange, value } = props;

  const handleChange = (value: number) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select placeholder={placeholder} defaultValue={value} onChange={handleChange}>
      {data.map((icon) => {
        return (
          <Select.Option key={icon.value} value={icon.value}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={icon.icon} style={{ marginRight: 8, width: 10, height: 12 }} />
              {icon.text}
            </div>
          </Select.Option>
        );
      })}
    </Select>
  );
};
