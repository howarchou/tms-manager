/**
 *  Created by pw on 2020/10/24 5:59 下午.
 */
import React, { FC } from 'react';
import styles from './PriceDetails.less';
import { InputNumber } from 'antd';

interface PriceCPProps {
  label?: string;
  value?: number;
  onChange?: (value: number | string | undefined) => void;
  showLabel: boolean;
  className?: string;
}

const PriceCP: FC<PriceCPProps> = (props: PriceCPProps) => {
  const {
    label = '费用明细',
    value,
    onChange,
    onFeeDetailClick,
    showLabel,
    className = '',
  } = props;
  return (
    <div className={styles.amountWrapper}>
      <InputNumber style={{ width: '100%' }} placeholder="单价" onChange={onChange} value={value} />
    </div>
  );
};

export default PriceCP;
