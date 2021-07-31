/**
 *  Created by pw on 2020/8/29 4:38 下午.
 */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from '@/pages/team-building-manage/TeamBuildingList.less';
import { Button, Input, Select, Space, Table } from 'antd';
import { history } from '@@/core/history';
import type { API } from '@/services/API';
import { OrderType } from '@/services/API.Enum';
import { getOrders } from '@/services/order';
import moment from 'moment';
import { orderSourceConfig, orderStatusConfig } from '@/helpers';
import { SearchOutlined } from '@ant-design/icons';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;
const { Option } = Select;

// eslint-disable-next-line func-names
export default function() {
  const [orderStatus, setOrderStatus] = useState<string[]>([]);
  const [status, setStatus] = useState<number>(0);
  const [source, setSource] = useState<number>(0);
  const [planner, setPlanner] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [sources, setSources] = useState<string[]>([]);
  const [data, setData] = useState<API.ListResponsePayload<API.Order>>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE, status, source, company, planner }).then(() => {});
  }, [company, planner, source, status]);

  useEffect(() => {
    const items: any[] = [];
    // eslint-disable-next-line no-return-assign
    orderStatusConfig().map(item => items[item.value] = item.text);
    setOrderStatus(items);
  }, []);

  useEffect(() => {
    const items: any[] = [];
    // eslint-disable-next-line no-return-assign
    orderSourceConfig().map(item => items[item.value] = item.text);
    setSources(items);
  }, []);

  const [page, setPage] = useState(DEFAULT_PAGE_NO);

  const fetchData = async (params: API.OrderListParam) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
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
        return type === OrderType.TB ? '团建' : '年会';
      },
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      render: (source: number) => {
        return sources[source] ?? '';
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
      // eslint-disable-next-line @typescript-eslint/no-shadow
      render: (status: string | number) => {
        return orderStatus[status] ?? '';
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
      render: (text: number) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
      fixed: 'right',
      render: (text: string, record: any) => (
        <Space size='middle'>
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <a onClick={() => handleDetail(record)}>查看</a>
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
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

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handlePageChange = (page: number) => {
    setPage(page);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE, status, source, company, planner });
  };

  const handleSearch = () => {
    setPage(DEFAULT_PAGE_NO);
    fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE, status, source, company, planner});
  };

  return (
    <PageContainer title={'团建订单'}>
      <div className={styles.team_building_list}>
        <div className={styles.team_building_add}>
          <Button type='primary' onClick={handleAdd}>
            添加
          </Button>
          <div className={styles.team_building_search}>
            <Select style={{ width: 100, marginLeft: 20, marginRight: 10 }} placeholder={'状态'} allowClear={true} onChange={(value) => setStatus(value as number)}>
              {orderStatusConfig().map((item) => {
                  return (
                    <Option key={item.value} value={item.value}>
                      {item.text}
                    </Option>
                  );
                },
              )}
            </Select>
            <Select style={{ width: 120, marginLeft: 10, marginRight: 10 }} placeholder={'来源'} allowClear={true} onChange={(value) => setSource(value as number)}>
              {orderSourceConfig().map((item) => {
                  return (
                    <Option key={item.value} value={item.value}>
                      {item.text}
                    </Option>
                  );
                },
              )}
            </Select>
            <Input style={{ width: 100, marginLeft: 10, marginRight: 10 }} type='text' placeholder={'策划师'}
                   value={planner} allowClear={true} onChange={(e) => setPlanner(e.target.value as string)} />
            <Input style={{ width: 200, marginLeft: 10, marginRight: 20 }} type='text' placeholder={'公司'}
                   value={company} allowClear={true} onChange={(e) => setCompany(e.target.value as string)} />
            <Button type='primary' icon={<SearchOutlined />} onClick={handleSearch}>搜索</Button>
          </div>
        </div>
        <Table
          key={'order_list'}
          // @ts-ignore
          columns={columns}
          dataSource={data?.data}
          pagination={{
            hideOnSinglePage: true,
            showSizeChanger: false,
            current: page,
            total: data?.total_count,
            showTotal:
              (total, range) => `第 ${range[0]}-${range[1]} 项, 共 ${total} 项`,
            onChange: handlePageChange,
          }}
          size='middle'
        />
      </div>
    </PageContainer>
  );
}
