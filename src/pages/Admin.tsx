import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

export default (): React.ReactNode => (
  <PageContainer>
    <Card>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        <SmileTwoTone /> 鱼悦团建 <HeartTwoTone twoToneColor="#eb2f96" /> You
      </Typography.Title>
    </Card>
  </PageContainer>
);
