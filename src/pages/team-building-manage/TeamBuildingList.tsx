/**
 *  Created by pw on 2020/8/29 5:23 下午.
 */
import React, { useState, useEffect } from 'react';
import { Space, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import AddTeambuildPanel from '@/pages/team-building-manage/AddTeambuildPanel';
import styles from './TeamBuildingList.less';
import { API } from '@/services/API';
import { getActivities } from '@/services/activity';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

export default () => {
  const [data, setData] = useState<API.ListResponsePayload<API.TeamBuilding>>();

  useEffect(() => {
    fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE });
  }, []);

  const fetchData = async (params: API.ListParam) => {
    const data = await getActivities(params);
    setData(data);
  };

  const handAddResult = (values: API.TeamBuilding) => {
    // data.push(values);
    // setData(data.slice());
    fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE });
  };

  const handleEdit = (record: API.TeamBuilding) => {
    // setData([]);
  };

  const handleDel = (record: API.TeamBuilding) => {};

  const handlePageChange = (page: number) => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_NO });
  };

  const columns = [
    {
      title: '活动ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '团建玩法',
      dataIndex: 'playType',
      key: 'playType',
    },
    {
      title: '人均价格',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: '可接纳人数',
      key: 'capacity',
      dataIndex: 'capacity',
    },
    {
      title: '活动周期',
      key: 'cycle',
      dataIndex: 'cycle',
      render: (cycle: number) => `${cycle}天`,
    },
    {
      title: '活动地区',
      key: 'area',
      dataIndex: 'area',
    },
    {
      title: '是否展示',
      key: 'display',
      dataIndex: 'display',
      render: (text: string, record: API.TeamBuilding) => {
        return record.display === 'add' ? '已上架' : '已下架';
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>查看</a>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleDel(record)}>下架</a>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <div className={styles.team_buildin_list}>
        <AddTeambuildPanel onResult={handAddResult} />
        <Table
          columns={columns}
          dataSource={data?.data}
          pagination={{ total: data?.page_size, onChange: handlePageChange }}
        />
      </div>
    </PageContainer>
  );
};
