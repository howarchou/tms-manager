/**
 *  Created by pw on 2020/10/24 12:49 下午.
 */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions } from 'antd';
import { API } from '@/services/API';
import HeaderBack from '@/components/HeaderBack';
import { history } from '@@/core/history';
import {getPartner} from '@/services/partner'
import {partnerDetailDescribe} from '@/helpers'

interface Props {
  location: any;
}

export default function (props: Props) {
  const { location } = props;
  const id = location?.query?.id;
  const [data, setData] = useState<API.Partner>({} as API.Partner);

  useEffect(() => {
    getPartner(id).then((s) => {
      setData(s);
    });
  }, [id]);


  const handleLeftClick = () => {
    history.push({
      pathname: '/supplier/partner',
    });
  };

  return (
    <PageContainer title={<HeaderBack title={'合作伙伴详情'} onBackClick={handleLeftClick} />}>
      <Card bordered={false}>
        <Descriptions style={{ marginBottom: 32 }}>
          {partnerDetailDescribe().map((item) => {
            return (
              <Descriptions.Item key={item.key} label={item.label}>
                {
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
