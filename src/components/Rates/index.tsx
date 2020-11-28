/**
 *  Created by pw on 2020/10/12 10:52 下午.
 */
import React from 'react';
import { Rate } from 'antd';
import { RateProps } from 'antd/lib/rate';
import './index.less';

interface Props extends RateProps {
  label?: string;
  value?: number;
  className?: string;
  disabled?: boolean;
}

export default function RateComponet(props: Props) {
  const { label, value, className = '', disabled = false, onChange } = props;
  return (
    <div className="rate-wrapper">
      {label ? <div className="rate-title">{label}</div> : null}
      <Rate
        className={`rate-content ${className}`}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

interface RateItem {
  value: number;
  key: string;
  text: string;
}

interface RateGroupProps {
  rates: RateItem[];
  value?: RateItem[];
  onChange?: (values: RateItem[]) => void;
}

export const RateGroup = (props: RateGroupProps) => {
  const { rates = [], value = [], onChange } = props;

  const handleChange = (number: number, rate: RateItem) => {
    const newValue = value || [];
    const index = newValue.findIndex((item) => item.key === rate.key);
    const addValue = { key: rate.key, value: number, text: rate.text };
    if (index != -1) {
      newValue[index] = addValue;
    } else {
      newValue.push(addValue);
    }
    if (onChange) {
      onChange(newValue.slice());
    }
  };

  return (
    <>
      {rates.map((rate) => {
        const star = value?.find((item) => item?.key === rate.key);
        return (
          <RateComponet
            key={rate.key}
            label={rate.text}
            value={star?.value}
            onChange={(value) => handleChange(value, rate)}
          />
        );
      })}
    </>
  );
};
