/**
 *  Created by pw on 2020/8/29 4:56 下午.
 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Typography } from 'antd';
export default (): React.ReactNode => (
  <PageContainer>
    <Typography.Text
      strong
      style={{
        marginBottom: 12,
      }}
    >
      账单列表
    </Typography.Text>
  </PageContainer>
);
