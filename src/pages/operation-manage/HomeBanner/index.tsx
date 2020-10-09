/**
 *  Created by pw on 2020/10/9 12:15 上午.
 */
import React, { useState } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Space, Table } from 'antd';
import AddBannerModal from '@/pages/operation-manage/HomeBanner/AddBannerModal';
import { HomeBannerStatus } from '@/services/API.Enum';
import { API } from '@/services/API';

export default function () {
  const [data, setData] = useState<API.HomeBanner[]>([]);
  const [editData, setEditData] = useState<API.HomeBanner>({} as API.HomeBanner);
  const [visible, setVisible] = useState(false);

  const columns = [
    {
      title: 'banner名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '跳转链接',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text: string, record: API.HomeBanner) => {
        return record.status === HomeBannerStatus.UP ? '已上架' : '已下架';
      },
    },
    {
      title: '缩略图',
      key: 'cover',
      dataIndex: 'cover',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: API.HomeBanner) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleState(record)}>下架</a>
          <a onClick={() => handleDel(record)}>删除</a>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: API.HomeBanner) => {
    setEditData(record);
    setVisible(true);
  };

  const handleDel = (record: API.HomeBanner) => {
    setData(data.filter((item) => item.id !== record.id));
  };

  const handleState = (record: API.HomeBanner) => {};

  const handAddResult = (banner: API.HomeBanner, isAdd: boolean) => {
    if (isAdd) {
      data.push(banner);
    } else {
      const index = data.findIndex((item) => item.id === banner.id);
      data[index] = banner;
    }
    setData(data.slice());
  };

  return (
    <PageContainer>
      <div className={styles.home_banner}>
        <div className={styles.home_banner_add}>
          <AddBannerModal onAdd={handAddResult} visibleModal={visible} data={editData} />
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </PageContainer>
  );
}
