/**
 *  Created by pw on 2020/8/29 4:38 下午.
 */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from '@/pages/team-building-manage/TeamBuildingList.less';
import { Button, Space, Table } from 'antd';
import { history } from '@@/core/history';
import { API } from '@/services/API';
import { HomeBannerStatus } from '@/services/API.Enum';
import { getOrders } from '@/services/order';

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
      title: '订单时间',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: '订单金额(元)',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '订单状态',
      key: 'status',
      dataIndex: 'status',
      render: (text: string, record: API.Order) => {
        return record.status === HomeBannerStatus.UP ? '已上架' : '已下架';
      },
    },
    {
      title: '活动名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '活动策划师',
      key: 'planner',
      dataIndex: 'planner',
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
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_NO });
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
          columns={columns}
          dataSource={data?.data}
          pagination={{ total: data?.page_size, onChange: handlePageChange }}
        />
      </div>
    </PageContainer>
  );
}
