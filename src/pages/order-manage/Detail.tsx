/**
 *  Created by pw on 2020/10/24 12:49 下午.
 */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions } from 'antd';
import { detailDescribe } from './helpers';
import { getOrderDetail } from '@/services/order';
import { API } from '@/services/API';
import { orderSourceConfig, orderStatusConfig } from '@/helpers';
import HeaderBack from '@/components/HeaderBack';
import { history } from '@@/core/history';

interface Props {
  location: any;
}

export default function (props: Props) {
  const { location } = props;
  const id = location?.query?.id;
  const [status, setStatus] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [data, setData] = useState<API.Order>({} as API.Order);

  useEffect(() => {
    getOrderDetail(id).then((data) => {
      setData(data);
    });
  }, [id]);

  useEffect(() => {
    const items: any[] = []
    // eslint-disable-next-line no-return-assign
    orderStatusConfig().map(item => items[item.value] = item.text)
    setStatus(items);
  }, []);

  useEffect(() => {
    const items: any[] = []
    // eslint-disable-next-line no-return-assign
    orderSourceConfig().map(item => items[item.value] = item.text)
    setSources(items);
  }, []);

  const handleLeftClick = () => {
    history.push({
      pathname: '/order/list',
    });
  };

  return (
    <PageContainer title={<HeaderBack title={'订单详情'} onBackClick={handleLeftClick} />}>
      <Card bordered={false}>
        <Descriptions style={{ marginBottom: 32 }}>
          {detailDescribe().map((item) => {
            return (
              <Descriptions.Item key={item.key} label={item.label}>
                {
                  // eslint-disable-next-line no-nested-ternary
                  item.key === 'status'? status[data[item.key]] :
                    item.key === 'source'? sources[data[item.key]] :
                  data[item.key]
                }
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </Card>
    </PageContainer>
  );
}
