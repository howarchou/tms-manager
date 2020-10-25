/**
 *  Created by pw on 2020/10/24 12:49 下午.
 */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions } from 'antd';
import { detailDescribe } from './helpers';
import { getOrderDetail } from '@/services/order';
import { API } from '@/services/API';

interface Props {
  location: any;
}

export default function (props: Props) {
  const { location } = props;
  const id = location?.query?.id;
  const [data, setData] = useState<API.Order>({} as API.Order);

  useEffect(() => {
    getOrderDetail(id).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <PageContainer title={'订单详情'}>
      <Card bordered={false}>
        <Descriptions title="订单信息" style={{ marginBottom: 32 }}>
          {detailDescribe().map((item) => {
            return (
              <Descriptions.Item key={item.key} label={item.label}>
                {data[item.key]}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </Card>
    </PageContainer>
  );
}
