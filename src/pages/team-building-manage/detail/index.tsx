/**
 *  Created by pw on 2020/10/18 12:39 下午.
 */
import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { getActivityDetail } from '@/services/activity';
import { API } from '@/services/API';
import { detailDescribe } from '../config';
import './index.less';
import Rate from '@/components/Rates';

interface Props {
  location: any;
}

export default function (props: Props) {
  const { location } = props;
  const [data, setData] = useState<API.TeamBuildingNew>({} as API.TeamBuildingNew);
  const id = location?.query?.id;
  useEffect(() => {
    getActivityDetail(id).then((data) => {
      setData(data);
    });
  }, [id]);

  return (
    <PageContainer>
      <Descriptions className="detail_wrapper" title={'基本信息'}>
        {detailDescribe().map((item, index) => {
          if (item.type === 'complex' && item.union?.length) {
            const value = item.union.map((line) => data[line]).join('-');
            return (
              <Descriptions.Item key={index} label={item.label}>
                {value}
              </Descriptions.Item>
            );
          }
          const componentMap = {
            attachment: ImageCP,
            stars: RateCP,
          };
          const CP = item.type ? componentMap[item.type] : undefined;
          const value = data[item.key];
          return (
            <Descriptions.Item key={index} label={item.label}>
              {CP ? <CP value={value} /> : value}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </PageContainer>
  );
}

interface ComponentProps {
  value: string;
}

function ImageCP(props: ComponentProps) {
  const { value } = props;
  return <img className="detail_image value" src={value} />;
}

function RateCP(props: ComponentProps) {
  const { value } = props;
  console.log(value);
  return (
    <>
      <Rate className="value" value={Number(1)} disabled={true} />
      <Rate className="value" value={Number(2)} disabled={true} />
      <Rate className="value" value={Number(3)} disabled={true} />
      <Rate className="value" value={Number(4)} disabled={true} />
      <Rate className="value" value={Number(5)} disabled={true} />
    </>
  );
}
