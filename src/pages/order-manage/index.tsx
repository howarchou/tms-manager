/**
 *  Created by pw on 2020/8/29 4:38 下午.
 */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from '@/pages/team-building-manage/TeamBuildingList.less';
import { Button, Space, Table } from 'antd';
import { history } from '@@/core/history';
import type { API } from '@/services/API';
import { HomeBannerStatus, OrderType } from '@/services/API.Enum';
import { getOrders } from '@/services/order';
import moment from 'moment';
import { activityTypeConfig, orderSourceConfig, orderStatusConfig } from '@/helpers';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

export default function () {
  const [data, setData] = useState<API.ListResponsePayload<API.Order>>();

  useEffect(() => {
    fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE });
  }, []);

  const fetchData = async (params: API.ListParam) => {
    const data = await getOrders(params);
    setData(data);
  };

  const handleAdd = () => {
    history.push({ pathname: '/order/add' });
  };

  const columns = [
    {
      title: '订单ID',
      dataIndex: 'order_no',
      key: 'order_no',
    },
    {
      title: '类型',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (type: OrderType) => {
        return type === OrderType.TB? '团建' : '年会';
      },
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      render: (source: number) => {
        const sources: any[] = []
        // eslint-disable-next-line no-return-assign
        orderSourceConfig().map(item => sources[item.value] = item.text)
        return sources[source]?? "";
      },
    },
    {
      title: '姓名',
      dataIndex: 'contact',
      key: 'contact'
    },
    {
      title: '联系方式',
      dataIndex: 'contact_mobile',
      key: 'contact_mobile',
    },
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '人数',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '订单状态',
      key: 'status',
      dataIndex: 'status',
      render: (status: string | number) => {
        const items: any[] = []
        // eslint-disable-next-line no-return-assign
        orderStatusConfig().map(item => items[item.value] = item.text)
        return items[status]?? "";
      },
    },
    {
      title: '未成单原因',
      key: 'planner',
      dataIndex: 'planner',
    },
    {
      title: '需求描述',
      key: 'remark',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <a onClick={() => handleDetail(record)}>查看</a>
          <a onClick={() => handleEdit(record)}>编辑</a>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: API.Order) => {
    history.push({
      pathname: '/order/add',
      query: { id: record.id },
    });
  };

  const handleDetail = (record: API.Order) => {
    history.push({
      pathname: '/order/detail',
      query: { id: record.id },
    });
  };

  const handlePageChange = (page: number) => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  return (
    <PageContainer title={'团建订单'}>
      <div className={styles.team_buildin_list}>
        <div className={styles.team_buildin_add}>
          <Button type="primary" onClick={handleAdd}>
            添加
          </Button>
        </div>
        <Table
          key={'order_list'}
          columns={columns}
          dataSource={data?.data}
          pagination={{ total: data?.total_count, onChange: handlePageChange }}
        />
      </div>
    </PageContainer>
  );
}
