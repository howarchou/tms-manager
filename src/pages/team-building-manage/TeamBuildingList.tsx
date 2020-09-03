/**
 *  Created by pw on 2020/8/29 5:23 下午.
 */
import React, { useState } from 'react';
import { Space, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import AddTeambuildPanel from '@/pages/team-building-manage/AddTeambuildPanel';
import styles from './TeamBuildingList.less';

export default () => {
  const [data, setData] = useState<API.TeamBuilding[]>([]);

  const handleEdit = (record: API.TeamBuilding) => {
    setData([]);
  };

  const handleDel = (record: API.TeamBuilding) => {};

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
        return record.display ? '已上架' : '已下架';
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
        <AddTeambuildPanel />
        <Table columns={columns} dataSource={data} />
      </div>
    </PageContainer>
  );
};
