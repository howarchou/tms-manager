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
  const [orderStatus, setOrderStatus] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [data, setData] = useState<API.ListResponsePayload<API.Order>>();

  useEffect(() => {
    fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE });
  }, []);

  useEffect(() => {
    const items: any[] = [];
    // eslint-disable-next-line no-return-assign
    orderStatusConfig().map(item => items[item.value] = item.text)
    setOrderStatus(items);
  }, []);

  useEffect(() =>{
    const items: any[] = [];
    // eslint-disable-next-line no-return-assign
    orderSourceConfig().map(item => items[item.value] = item.text)
    setSources(items);
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
      width: 200,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 50,
      textWrap: 'word-break',
      ellipsis: true,
      render: (type: OrderType) => {
        return type === OrderType.TB? '团建' : '年会';
      },
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
      render: (source: number) => {
        return sources[source]?? '';
      },
    },
    {
      title: '姓名',
      dataIndex: 'contact',
      key: 'contact',
      width: 80,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '联系方式',
      dataIndex: 'contact_mobile',
      key: 'contact_mobile',
      width: 120,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
      width: 200,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '人数',
      dataIndex: 'people_number',
      key: 'people_number',
      width: 50,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '订单状态',
      key: 'status',
      dataIndex: 'status',
      width: 80,
      textWrap: 'word-break',
      ellipsis: true,
      render: (status: string | number) => {
        return orderStatus[status]??''
      },
    },
    {
      title: '未成单原因',
      key: 'uncompleted_reason',
      dataIndex: 'uncompleted_reason',
      width: 200,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '策划师',
      key: 'planner',
      dataIndex: 'planner',
      width: 80,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '需求描述',
      key: 'remark',
      dataIndex: 'remark',
      width: 200,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '创建时间',
      key: 'created_at',
      dataIndex: 'created_at',
      width: 200,
      textWrap: 'word-break',
      ellipsis: true,
      render: (text: number) => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
      fixed: 'right',
      render: (text: string, record: any) => (
        <Space size="middle">
          <a onClick={() => handleDetail(record)}>查看</a>
          <a onClick={() => handleEdit(record)}>编辑</a>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: API.Order) => {
    // @ts-ignore
    history.push({
      pathname: '/order/add',
      query: { id: record.id },
    });
  };

  const handleDetail = (record: API.Order) => {
    // @ts-ignore
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
      <div className={styles.team_building_list}>
        <div className={styles.team_building_add}>
          <Button type="primary" onClick={handleAdd}>
            添加
          </Button>
        </div>
        <Table
          key={'order_list'}
          // @ts-ignore
          columns={columns}
          dataSource={data?.data}
          pagination={{ total: data?.total_count, onChange: handlePageChange }}
          size="middle"
        />
      </div>
    </PageContainer>
  );
}
